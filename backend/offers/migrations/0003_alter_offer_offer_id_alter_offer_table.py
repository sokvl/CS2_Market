# Generated by Django 5.0.3 on 2024-04-04 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offers', '0002_offer_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='offer',
            name='offer_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterModelTable(
            name='offer',
            table='offers',
        ),
    ]
