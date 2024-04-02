from rest_framework import serializers
from users.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'username', 'steam_id', 'avatar_url', 'steam_tradelink', 'is_admin']

        def create(self, validated_data):
            user = User.objects.create_user(**validated_data)
            return user