import django_filters
from .models import Offer, Item


class ItemFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains')
    condition = django_filters.CharFilter(lookup_expr='iexact')
    category = django_filters.CharFilter(lookup_expr='icontains')
    created_after = django_filters.DateFilter(field_name='creation_date', lookup_expr='gte')
    created_before = django_filters.DateFilter(field_name='creation_date', lookup_expr='lte')


    class Meta:
        model = Item
        fields = []

class OfferFilter(django_filters.FilterSet):
    price_min = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    price_max = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
   # item = django_filters.RelatedFilter(ItemFilter, field_name='item', queryset=Item.objects.all())
    item_name = django_filters.CharFilter(field_name='item__item_name', lookup_expr='icontains')
    item_condition = django_filters.CharFilter(field_name='item__condition', lookup_expr='iexact')
    item_category = django_filters.CharFilter(field_name='item__category', lookup_expr='iexact')
    listed_after = django_filters.DateFilter(field_name='item__creation_date', lookup_expr='gte')
    listed_before = django_filters.DateFilter(field_name='item__creation_date', lookup_expr='lte')


    class Meta:
        model = Offer
        fields = [
            'price_min',
            'price_max',
            'item_name',
            'item_condition',
            'item_category',
        ]