from django.db import models
from django.utils import timezone
from users.models import User

class Offer(models.Model):
    offer_id = models.IntegerField(primary_key=True)
    owner_id = models.ForeignKey(User, on_delete=models.CASCADE)
    creation_date = models.DateField(default=timezone.now)
    sale_date = models.DateField(null=True)
    is_active = models.BooleanField(default=True)
    item_id = models.IntegerField()    # In future it will be connection to item model
    price = models.FloatField()

    class Meta:
        db_table = 'offer'