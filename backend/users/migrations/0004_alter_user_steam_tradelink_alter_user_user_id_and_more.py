# Generated by Django 5.0.3 on 2024-04-04 09:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_user_managers_user_date_joined_user_email_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='steam_tradelink',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='wallet',
            name='wallet_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
