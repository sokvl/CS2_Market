from rest_framework import viewsets
from .models import Transaction, Rating, Notification
from .serializers import TransactionSerializer, RatingSerializer, NotificationSerializer
import django_filters

class TransactionViewSet(viewsets.ModelViewSet):
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer