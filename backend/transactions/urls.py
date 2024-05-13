from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet, RatingViewSet, NotificationViewSet

router = DefaultRouter()
router.register(r'', TransactionViewSet)
router.register(r'ratings', RatingViewSet)
router.register(r'notifications', NotificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]