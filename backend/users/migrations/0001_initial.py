# Generated by Django 4.2.2 on 2024-04-02 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.IntegerField(primary_key=True, serialize=False)),
                ('username', models.TextField()),
                ('steam_id', models.TextField()),
                ('avatar_url', models.TextField()),
                ('steam_tradelink', models.TextField()),
                ('is_admin', models.BooleanField()),
            ],
            options={
                'db_table': 'user',
            },
        ),
    ]
