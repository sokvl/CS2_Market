from datetime import datetime
from rest_framework.test import APIClient, APITestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from unittest.mock import MagicMock, patch
from transactions.models import Transaction, Rating
from offers.models import Offer, Item

class RatingReportTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('rating_report')

        self.user1 = get_user_model().objects.create(username='user1', steam_id='1')
        self.user2 = get_user_model().objects.create(username='user2', steam_id='2')
        
        item1 = Item.objects.create(item_name='Item1', category='Category1', img_link='http://example.com/item1', inspect="ble")
        offer1 = Offer.objects.create(owner=self.user1, item=item1, price=100)
        transaction1 = Transaction.objects.create(offer=offer1, buyer=self.user2, is_closed=True)
        Rating.objects.create(transaction=transaction1, stars=4)

        item2 = Item.objects.create(item_name='Item2', category='Category2', img_link='http://example.com/item2', inspect="bla")
        offer2 = Offer.objects.create(owner=self.user2, item=item2, price=200)
        transaction2 = Transaction.objects.create(offer=offer2, buyer=self.user1, is_closed=True)
        Rating.objects.create(transaction=transaction2, stars=5)

    @patch('transactions.models.Transaction.objects.filter')
    def test_rating_report(self, mock_filter):
        mock_filter.return_value.annotate.return_value.filter.return_value.order_by.return_value = [
            {'id': self.user1.user_id, 'username': 'user1', 'average_rating': 4.0, 'number_of_ratings': 1},
            {'id': self.user2.user_id, 'username': 'user2', 'average_rating': 5.0, 'number_of_ratings': 1}
        ]
        
        response = self.client.get(self.url, {'min_rating': 0, 'max_rating': 5})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[1]['average_rating'], '4.00')
        self.assertEqual(response.data[0]['average_rating'], '5.00')


class TransactionReportTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('transaction_report')

        self.user1 = get_user_model().objects.create(username='user1', steam_id='3')
        self.user2 = get_user_model().objects.create(username='user2', steam_id='4')

        item1 = Item.objects.create(item_name='Item3', category='Category1', img_link='http://example.com/item1', inspect="ble2")
        offer1 = Offer.objects.create(owner=self.user1, item=item1, price=100)
        Transaction.objects.create(offer=offer1, buyer=self.user2, is_closed=True, closed_date='2023-01-01')

        item2 = Item.objects.create(item_name='Item4', category='Category2', img_link='http://example.com/item2', inspect="bla2")
        offer2 = Offer.objects.create(owner=self.user2, item=item2, price=200)
        Transaction.objects.create(offer=offer2, buyer=self.user1, is_closed=True, closed_date='2023-01-02')

    '''
    @patch('transactions.views.Transaction.objects.filter')
    def test_transaction_report(self, mock_filter):
        mock_query = MagicMock()
        mock_query.aggregate.return_value = {
            'average_price': 150.0,
            'total_price': 300.0,
            'quantity': 2
        }
        mock_filter.return_value = mock_query

        response = self.client.get(self.url, {
            'start_date': '2023-01-01',
            'end_date': '2023-01-02',
            'category': 'all',
            'min_price': 50,
            'max_price': 300
        })

        self.assertEqual(response.status_code, 200)
        self.assertIn('transaction_reports', response.json())
        self.assertIn('total_transactions', response.json())
        
        # Sprawdzamy, czy raporty transakcji mają oczekiwane dane
        transaction_reports = response.json()['transaction_reports']
        self.assertEqual(len(transaction_reports), 2)
        self.assertEqual(transaction_reports[0]['average_price'], 100.0)
        self.assertEqual(transaction_reports[1]['average_price'], 200.0)
        
        # Sprawdzamy, czy total_transactions ma oczekiwane dane
        total_transactions = response.json()['total_transactions']
        self.assertEqual(total_transactions['average_price'], 150.0)
        self.assertEqual(total_transactions['total_price'], 300.0)
        self.assertEqual(total_transactions['quantity'], 2)
    '''

    @patch('transactions.models.Transaction.objects.filter')
    def test_transaction_report_missing_dates(self, mock_filter):
        response = self.client.get(self.url, {
            'category': 'all',
            'min_price': 50,
            'max_price': 300
        })
        print(response.status_code)
        print(response.json()['error'])
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'Missing Date Fields')

    @patch('transactions.models.Transaction.objects.filter')
    def test_transaction_report_invalid_date_format(self, mock_filter):
        response = self.client.get(self.url, {
            'start_date': 'invalid-date',
            'end_date': '2023-01-02',
            'category': 'all',
            'min_price': 50,
            'max_price': 300
        })
        print(response.status_code)
        print(response.json()['error'])
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'Incorrect date format')
