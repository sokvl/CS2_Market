from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.serializers.Offer_serializer import OfferSerializer
from api.serializers.Item_serializer import ItemSerializer
from .models import Offer, Item

@api_view(['GET'])
def get_offer(request, offer_id):
    try:
        offer = Offer.objects.get(offer_id=offer_id)
        serializer = OfferSerializer(offer)
        return Response(serializer.data)
    except Offer.DoesNotExist:
        return Response({'error': 'Offer with this offer id doesn`t exist.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_offer(request):
    serializer = OfferSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Offer successfully created.'}, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#TODO: Parametrized offers selection

#################
# Item section #
###############

@api_view(['GET'])
def get_item(request, item_id):
    try:
        item = Item.objects.get(offer_id=item_id)
        serializer = ItemSerializer(item)
        return Response(serializer.data)
    except Item.DoesNotExist:
        return Response({'error': 'Offer with this offer id doesn`t exist.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_item(request):
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Offer successfully created.'}, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)