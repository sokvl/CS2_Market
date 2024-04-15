from rest_framework import serializers

from offers.models import Offer

class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = '__all__'
    def create(self, validated_data):
        offer = Offer.objects.create(**validated_data)
        return offer
