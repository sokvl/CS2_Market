from django.db import models
from django.contrib.auth import get_user_model

from offers.models import Offer

class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    offer = models.OneToOneField(Offer, related_name='transaction', on_delete=models.CASCADE)
    buyer = models.OneToOneField(get_user_model(), related_name='transactions_as_buyer', on_delete=models.CASCADE)
    is_closed = models.BooleanField(default=False)
    value = models.IntegerField()

    @property
    def seller_id(self):
        return self.offer.owner_id

    class Meta:
        db_table = 'Transactions'


class Rating (models.Model):
    rating_id = models.AutoField(primary_key=True)
    stars = models.IntegerField()
    transaction = models.OneToOneField(Transaction, related_name='ratings', on_delete=models.CASCADE)

    class Meta:
        db_table = 'Ratings'

class Notification (models.Model):
    notification_id = models.AutoField(primary_key=True)
    transaction = models.OneToOneField(Transaction, related_name='notifications', on_delete=models.CASCADE)
    message = models.CharField(max_length=255)
    active = models.BooleanField()

    @property
    def user_id(self):
        return self.transaction.seller_id

    class Meta:
        db_table = 'Notifications'