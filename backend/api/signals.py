from django.dispatch import Signal, receiver
from django.db import transaction, Error

from users.models import Wallet

payment_successful = Signal(providing_args=["user", "amount"])

@receiver(payment_successful)
def handle_payment_success(sender, **kwargs):
    user = kwargs['user']
    amount = kwargs['amount']
    try:
        with transaction.atomic(): 
            wallet = Wallet.objects.get(user_id=user)
            wallet.balance += amount
            wallet.save()
    except Wallet.DoesNotExist:
        raise Error(f"Wallet not found for user {user.id}")
    except Exception as e:
        raise Error(f"Error updating wallet for user {user.id}: {e}")