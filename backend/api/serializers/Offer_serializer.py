from rest_framework import serializers
from .Item_serializer import ItemSerializer
from offers.models import Offer, Item

class OfferSerializer(serializers.ModelSerializer):
    item = ItemSerializer()

    class Meta:
        model = Offer
        fields = '__all__'

    """
    You have to send smthng like this as json body:
        data: {
            just:
            offer:
            data: 
            item : {
                some:
                item:
                data:
            }
        }
    """

    def create(self, validated_data):
        item_data = validated_data.pop('item')
        item = Item.objects.create(**item_data)
        offer = Offer.objects.create(item=item, **validated_data)
        return offer
