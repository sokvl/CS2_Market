from django.urls import path
from .views import RatingReport, TransactionReport

urlpatterns = [
    path('rating/', RatingReport.as_view(), name='rating_report'),
    path('transaction/', TransactionReport.as_view(), name='transaction_report'),
]