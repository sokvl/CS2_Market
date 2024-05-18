from rest_framework import viewsets, generics
from django.contrib.auth import get_user_model
from .serializers import UserCreateUpdateSerializer, WalletSerializer
from api.serializers.User_serializer import UserSerializer 
from .models import Wallet
from rest_framework.exceptions import NotFound

class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    lookup_field = 'steam_id'

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return UserCreateUpdateSerializer
        return UserSerializer

class WalletDetailView(generics.RetrieveAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer
    def get_object(self):
        steam_id = self.kwargs['steam_id']
        try:
            user = get_user_model().objects.get(steam_id=steam_id)
            wallet = Wallet.objects.get(user=user)
            return wallet
        except get_user_model().DoesNotExist:
            raise NotFound('User with this steam_id does not exist')
        except Wallet.DoesNotExist:
            raise NotFound('Wallet for this user does not exist')