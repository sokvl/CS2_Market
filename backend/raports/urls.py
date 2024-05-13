from django.urls import path
from .views import RatingReport

urlpatterns = [
    path('rating/', RatingReport.as_view(), name='rating_report'),
]