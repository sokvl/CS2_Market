from django.urls import path
from .views.offers_views import testget

urlpatterns = [
    path('offers/', testget)
]