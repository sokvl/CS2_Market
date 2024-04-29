from django.urls import path, include
from .views.payment_views import create_checkout_session
from .views.auth_views import steam_login, steam_login_callback, steam_bridge
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('login/', steam_login),
    path('callback/', steam_login_callback),
    path('payment/<int:amount>', create_checkout_session),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/bridge/', steam_bridge)
]