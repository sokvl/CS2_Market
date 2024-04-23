from django.urls import path, include
from .views.payment_views import create_checkout_session
from .views.auth_views import steam_login, steam_login_callback

urlpatterns = [
    path('login/', steam_login),
    path('callback/', steam_login_callback),
    path('payment/', create_checkout_session)
]