from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

class Offer(models.Model):
    offer_id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    creation_date = models.DateField(default=timezone.now)
    sale_date = models.DateField(null=True)
    is_active = models.BooleanField(default=True)
    item = models.OneToOneField('Item', on_delete=models.CASCADE)
    price = models.FloatField()
    quantity = models.IntegerField(default = 1)

    class Meta:
        db_table = 'Offers'



class Item(models.Model):
    item_id = models.AutoField(primary_key=True)
    item_name = models.TextField()
    img_link = models.TextField()
    condition = models.CharField(max_length=2, blank=True, null=True)
    stickerstring = models.TextField(blank=True, null=True)
    inspect = models.TextField(unique=True)
    rarity = models.TextField()
    category = models.TextField()
    listed = models.BooleanField(default=False)
    tradeable = models.BooleanField(default=True)

    class Meta:
        db_table = 'Items'