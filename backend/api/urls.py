from django.urls import path
from .views.offers_views import testget
from .views.auth_views import steam_login, steam_return

urlpatterns = [
    path('offers/', testget),
    path('login/', steam_login, name='steam_login'),
   # path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('login/steam/return/', steam_return, name='steam_return'),
]