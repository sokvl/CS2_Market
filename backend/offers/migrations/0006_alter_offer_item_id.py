# Generated by Django 5.0.3 on 2024-04-10 17:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offers', '0005_item'),
    ]

    operations = [
        migrations.AlterField(
            model_name='offer',
            name='item_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='offers.item'),
        ),
    ]
