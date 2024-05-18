from django.dispatch import Signal, receiver
from django.db import transaction, Error
from users.models import Wallet
from django.contrib.auth import get_user_model
import decimal

payment_successful = Signal(["user", "amount"])

@receiver(payment_successful)
def handle_payment_success(sender, **kwargs):
    user = kwargs['user']
    amount = kwargs['amount']
    try:
        with transaction.atomic(): 
            user_object = get_user_model().objects.get(steam_id=str(user))
            wallet = Wallet.objects.get(user_id=user_object.user_id)
            wallet.balance += decimal.Decimal(amount)
            wallet.save()
    except Wallet.DoesNotExist:
        raise Error(f"Wallet not found for user {user}")
    except Exception as e:
        raise Error(f"Error updating wallet for user {user}: {e}")