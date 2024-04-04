from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

class Offer(models.Model):
    offer_id = models.AutoField(primary_key=True)
    owner_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    creation_date = models.DateField(default=timezone.now)
    sale_date = models.DateField(null=True)
    is_active = models.BooleanField(default=True)
    item_id = models.IntegerField()    # In future it will be connection to item model
    price = models.FloatField()
    quantity = models.IntegerField(default = 0)

    class Meta:
        db_table = 'Offers'