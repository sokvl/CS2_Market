# Generated by Django 5.0.3 on 2024-04-16 13:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0004_rename_notifications_notification_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notification',
            old_name='transaction_id',
            new_name='transaction',
        ),
        migrations.RenameField(
            model_name='rating',
            old_name='transaction_id',
            new_name='transaction',
        ),
        migrations.RemoveField(
            model_name='notification',
            name='user_id',
        ),
    ]
