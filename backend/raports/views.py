import json
from django.utils import timezone
from transactions.models import Transaction
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Avg, Count, Sum
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.core.serializers import serialize
from datetime import timedelta
from datetime import date
from django.utils.dateparse import parse_date

from api.serializers.Raports_serializers import UserRatingSerializer

class RatingReport(APIView):
    def get(self, request):
        min_rating = request.query_params.get('min_rating', 0)
        max_rating = request.query_params.get('max_rating', 5)

        users_with_rating = get_user_model().objects.filter(
            selling_offer__offer_transaction__is_closed=True
        ).annotate(
            average_rating=Avg('selling_offer__offer_transaction__ratings__stars'),
            number_of_ratings=Count('selling_offer__offer_transaction__ratings__stars')
        ).filter(
            average_rating__gte=min_rating,
            average_rating__lte=max_rating
        ).order_by('-average_rating')

        serializer = UserRatingSerializer(users_with_rating, many=True)
        return Response(serializer.data)


class TransactionReport(APIView):
    def get(self, request):
        start_date = request.query_params.get('start_date', None) # YYYY-MM-DD
        end_date = request.query_params.get('end_date', None)
        category = request.query_params.get('category', None)
        min_price = request.query_params.get('min_price', None)
        max_price = request.query_params.get('max_price', None)

        try:
            if start_date and end_date and end_date > start_date:
                print("Start date:", start_date)
                print("End date:", end_date)
                start_date = parse_date(start_date)
                end_date = parse_date(end_date)
                current_date = start_date
                transaction_reports = []

                while current_date <= end_date:
                    next_day = current_date + timedelta(days=1)
                    filter_criteria = {
                        'is_closed': True,
                        'closed_date__date': current_date,
                        'offer__price__gte': min_price,
                        'offer__price__lte': max_price,
                    }
                    if category != 'all':
                        filter_criteria['offer__item__category'] = category
                    
                    daily_transactions = Transaction.objects.filter(**filter_criteria).aggregate(
                        average_price=Avg('offer__price'),
                        total_price=Sum('offer__price'),
                        quantity=Count('offer__offer_id')
                    )

                    if daily_transactions['quantity'] > 0:
                        transaction_reports.append({
                            'date': current_date,
                            'average_price': daily_transactions['average_price'],
                            'total_price': daily_transactions['total_price'],
                            'quantity': daily_transactions['quantity'],
                        })
                    current_date = next_day

                filter_criteria = {
                    'is_closed': True,
                    'closed_date__date__gte': start_date,
                    'closed_date__date__lte': end_date,
                    'offer__price__gte': min_price,
                    'offer__price__lte': max_price,
                }
                if category != 'all':
                    filter_criteria['offer__item__category'] = category

                total_transactions = Transaction.objects.filter(**filter_criteria).aggregate(
                    average_price=Avg('offer__price'),
                    total_price=Sum('offer__price'),
                    quantity=Count('offer__offer_id')
                )

                return JsonResponse(
                    {
                        'transaction_reports': transaction_reports,
                        'total_transactions': total_transactions 
                    }, json_dumps_params={'indent': 2}
                )
               
            else:
                return JsonResponse({'error': 'Missing Date Fields'}, status=400)
        except ValueError:
            return JsonResponse({'error': 'Incorrect date format'}, status=400)