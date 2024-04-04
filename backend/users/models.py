from django.db import models

class User(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    username = models.TextField()
    steam_id = models.TextField()
    avatar_url = models.TextField()
    steam_tradelink = models.TextField(blank=True)
    is_admin = models.BooleanField()


    class Meta:
        db_table = 'Users'


class Wallet(models.Model):
    wallet_id = models.AutoField(primary_key=True)
    user_id = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    class Meta:
        db_table = 'Wallets'
    