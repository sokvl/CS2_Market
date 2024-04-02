from django.urls import path, include
from .views.offers_views import testget
from .views.auth_views import steam_login, steam_login_callback

urlpatterns = [
    path('login/', steam_login),
    path('callback/', steam_login_callback)
]