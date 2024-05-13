from rest_framework.decorators import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from api.serializers.Offer_serializer import OfferSerializer
from api.serializers.Item_serializer import ItemSerializer
from .models import Offer, Item
from .filters import OfferFilter
import django_filters

class OfferViewSet(viewsets.ModelViewSet):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filterset_class = OfferFilter
    permission_classes = [IsAuthenticatedOrReadOnly]

#################
# Item section #
###############

class ItemDetailView(APIView):
    def get(self, request, item_id, format=None):
        try:
            item = Item.objects.get(item_id=item_id)
            serializer = ItemSerializer(item)
            return Response(serializer.data)
        except Item.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)