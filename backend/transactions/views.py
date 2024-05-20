from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
import django_filters
from rest_framework.response import Response

from .models import Transaction, Rating, Notification
from .serializers import TransactionSerializer, RatingSerializer, NotificationSerializer
from offers.models import Offer

class TransactionViewSet(viewsets.ModelViewSet):
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
       
    def create(self, request, *args, **kwargs):
        buyer_sid = request.data.get('buyer')
        if buyer_sid:
            try:
                user = get_user_model().objects.get(steam_id=buyer_sid)
                request.data['buyer'] = user.user_id
            except get_user_model().DoesNotExist:
                return Response({'error': 'User with this public_id does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        print(f'Fetching notifications for user: {user}')
        queryset = Notification.objects.filter(transaction__offer__owner=user, active=True)
        print(f'Queryset: {queryset}')
        return queryset