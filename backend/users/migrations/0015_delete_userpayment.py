# Generated by Django 5.0.3 on 2024-05-19 11:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0014_userpayment'),
    ]

    operations = [
        migrations.DeleteModel(
            name='UserPayment',
        ),
    ]
