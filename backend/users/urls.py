from django.urls import path
from .views import get_user, create_user

urlpatterns = [
    path('<str:steam_id>/', get_user, name='get_user_by_steam_id'),
    path('', create_user, name='create_user'),
]