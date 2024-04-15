from django.urls import path
from .views import get_offer, get_item, create_item, create_offer

urlpatterns = [
    path('<str:offer_id>/', get_offer, name='get_offer_by_id'),
    path('create', create_item, name='create_offer'),
    ## ITEM
    path('create_item', create_item, name='create_item'),
    path('item/<str:item_id>', get_item, name='get_item')
]