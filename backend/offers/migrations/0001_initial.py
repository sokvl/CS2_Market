# Generated by Django 4.2.2 on 2024-04-02 09:39

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Offer',
            fields=[
                ('offer_id', models.IntegerField(primary_key=True, serialize=False)),
                ('creation_date', models.DateField(default=django.utils.timezone.now)),
                ('sale_date', models.DateField(null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('item_id', models.IntegerField()),
                ('price', models.FloatField()),
                ('owner_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
            options={
                'db_table': 'offer',
            },
        ),
    ]
