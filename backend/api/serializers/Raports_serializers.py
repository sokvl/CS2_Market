from rest_framework import serializers
from django.contrib.auth import get_user_model

class UserRatingSerializer(serializers.ModelSerializer):
    average_rating = serializers.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        model = get_user_model()
        fields = ['user_id', 'username', 'avatar_url', 'average_rating']