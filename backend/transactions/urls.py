from django.urls import path
from .views import get_notification, create_notification

urlpatterns = [
    path('create_notification/', create_notification, name='create_notification'),
    path('notification/<int:notification_id>/', get_notification, name='get_notification_by_id'),
]