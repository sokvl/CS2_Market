from datetime import timezone
from transactions.models import Transaction
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Avg, Count, Sum
from django.contrib.auth import get_user_model
from django.http import JsonResponse


from api.serializers.Raports_serializers import UserRatingSerializer

class RatingReport(APIView):
    def get(self, request):
        min_rating = request.query_params.get('min_rating', 0)
        max_rating = request.query_params.get('max_rating', 5)

        users_with_rating = get_user_model().objects.filter(
            selling_offer__offer_transaction__is_closed=True
        ).annotate(
            average_rating=Avg('selling_offer__offer_transaction__ratings__stars')
        ).filter(
            average_rating__gte=min_rating,
            average_rating__lte=max_rating
        )

        serializer = UserRatingSerializer(users_with_rating, many=True)
        return Response(serializer.data)


class TransactionReport(APIView):
    def get(self, request):
        start_date = request.query_params.get('start_date', None)
        end_date = request.query_params.get('end_date', None)
        category = request.query_params.get('category', None)
        min_price = request.query_params.get('min_price', None)
        max_price = request.query_params.get('max_price', None)


        if start_date and end_date:
            try:
                start_date = timezone.make_aware(timezone.datetime.strptime(start_date, '%Y-%m-%d'))
                end_date = timezone.make_aware(timezone.datetime.strptime(end_date, '%Y-%m-%d'))
            except ValueError:
                return JsonResponse({'error': 'Incorrect date format'}, status=400)

            transaction_report = Transaction.objects.filter(
                created_at__date__gte=start_date,
                created_at__date__lte=end_date
            ).values('created_at__date').annotate(
                avg_price=Avg('value'),
                total_transactions=Sum(1),
                total_amount=Sum('value')
            )

            total_transactions = sum(item['total_transactions'] for item in transaction_report)
            total_amount = sum(item['total_amount'] for item in transaction_report)

            return JsonResponse({
                'transaction_report': list(transaction_report),
                'total_transactions': total_transactions,
                'total_amount': total_amount
            })

        else:
            return JsonResponse({'error': 'Missing date fields data'}, status=400)