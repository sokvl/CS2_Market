from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from .models import Offer, Item
from api.serializers.Offer_serializer import OfferSerializer
from api.serializers.Item_serializer import ItemSerializer

class OfferSerializerTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username='test_user', password='test_password')
        self.item = Item.objects.create(
            item_name='Test Item',
            img_link='http://example.com/test.jpg',
            condition='N',
            inspect='http://example.com/inspect',
            rarity='Common',
            category='Test',
            listed=False,
            tradeable=True
        )
        self.offer_data = {
            'owner': self.user.pk,
            'creation_date': timezone.now(),
            'sale_date': None,
            'is_active': True,
            'item': self.item.pk, 
            'price': 10.5,
            'quantity': 1
        }

    def test_offer_serializer_valid(self):
        serializer = OfferSerializer(data=self.offer_data)
        self.assertTrue(serializer.is_valid())

    def test_offer_serializer_invalid(self):
        invalid_data = self.offer_data.copy()
        invalid_data['owner'] = None
        serializer = OfferSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())

class ItemSerializerTest(TestCase):
    def setUp(self):
        self.item_data = {
            'item_name': 'Test Item',
            'img_link': 'http://example.com/test.jpg',
            'condition': 'N',
            'stickerstring': None,
            'inspect': 'http://example.com/inspect',
            'rarity': 'Common',
            'category': 'Test',
            'listed': False,
            'tradeable': True
        }

    def test_item_serializer_valid(self):
        serializer = ItemSerializer(data=self.item_data)
        self.assertTrue(serializer.is_valid())

    def test_item_serializer_invalid(self):
        invalid_data = self.item_data.copy()
        invalid_data['item_name'] = ''
        serializer = ItemSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())

class OfferViewsTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = get_user_model().objects.create_user(username='test_user', password='test_password')
        self.client.force_login(self.user)
        self.item = Item.objects.create(
            item_name='Test Item',
            img_link='http://example.com/test.jpg',
            condition='N',
            inspect='http://example.com/inspect',
            rarity='Common',
            category='Test',
            listed=False,
            tradeable=True
        )

    def test_create_offer(self):
        url = reverse('create_offer')
        response = self.client.post(url, {
            'owner': self.user.pk,
            'creation_date': timezone.now(),
            'sale_date': None,
            'is_active': True,
            'item': self.item.pk, 
            'price': 10.5,
            'quantity': 1
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_offer(self):
        offer = Offer.objects.create(
            owner=self.user,
            creation_date=timezone.now(),
            sale_date=None,
            is_active=True,
            item=self.item, 
            price=10.5,
            quantity=1
        )
        url = reverse('get_offer_by_id', kwargs={'offer_id': offer.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class ItemViewsTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_create_item(self):
        url = reverse('create_item')
        response = self.client.post(url, {
            'item_name': 'Test Item',
            'img_link': 'http://example.com/test.jpg',
            'condition': 'N',
            'stickerstring': None,
            'inspect': 'http://example.com/inspect',
            'rarity': 'Common',
            'category': 'Test',
            'listed': False,
            'tradeable': True
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_item(self):
        item = Item.objects.create(
            item_name='Test Item',
            img_link='http://example.com/test.jpg',
            condition='N',
            inspect='http://example.com/inspect',
            rarity='Common',
            category='Test',
            listed=False,
            tradeable=True
        )
        url = reverse('get_item', kwargs={'item_id': item.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)