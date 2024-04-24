from rest_framework import viewsets
from django.contrib.auth import get_user_model
from .serializers import UserCreateUpdateSerializer
from api.serializers.User_serializer import UserSerializer 

class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    lookup_field = 'steam_id'

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return UserCreateUpdateSerializer
        return UserSerializer