from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Avg
from django.contrib.auth import get_user_model

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
