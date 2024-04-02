from django.db import models

class User(models.Model):
    user_id = models.IntegerField(primary_key=True)
    username = models.TextField()
    steam_id = models.TextField()
    avatar_url = models.TextField()
    steam_tradelink = models.TextField()
    is_admin = models.BooleanField()

    class Meta:
        db_table = 'user'