from django.urls import path, include
from .views.payment_views import create_checkout_session, stripe_webhook
from .views.auth_views import steam_login, steam_login_callback, steam_bridge
from .views.inventory_views import get_item_details, get_user_inventory
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    ### Authentication ###
    path('login/', steam_login),
    path('callback/', steam_login_callback),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/bridge/', steam_bridge),
    ### Payment ###
    path('payment/<int:amount>/<str:user_id>/', create_checkout_session),
    path('web_hook/', stripe_webhook),

    ### Inventory Views ###
    path('inv/<str:user_id>', get_user_inventory),
    path('inv/item/', get_item_details),
]
