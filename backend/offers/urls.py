from django.urls import path, include
from .views import ItemDetailView, OfferViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', OfferViewSet)

urlpatterns = [
    path('item/<int:item_id>/', ItemDetailView.as_view(), name='item-detail'),
    path('', include(router.urls)),
]
