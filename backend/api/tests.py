from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from unittest.mock import patch
import requests
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
import stripe
import json 

User = get_user_model()

class SteamAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='test_user', password='test_password')
        token = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + str(token.access_token))


    @patch('requests.get')
    def test_get_user_inventory_missing_user_id(self, mock_get):
        url = reverse('get-user-inventory', args=[None])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Error', response.json())
        self.assertEqual(response.json()['Error'], 'This user has never been created.')

    @patch('requests.get')
    def test_get_item_details(self, mock_get):
        mock_get.return_value.json.return_value = {'item_details': 'test_details'}
        mock_get.return_value.status_code = 200

        url = reverse('get-item-details')
        data = {'inspect_link': 'http://example.com/inspect'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('item_details', response.json())
        self.assertEqual(response.json()['item_details']['item_details'], 'test_details')

    @patch('requests.get')
    def test_get_item_details_missing_inspect_link(self, mock_get):
        url = reverse('get-item-details')
        data = {'inspect_link': None}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Error', response.json())
        self.assertEqual(response.json()['Error'], 'Provide inspect_link param')


class StripePaymentTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.amount = 100
        self.user_id = 'test_user_id'
        self.create_checkout_session_url = reverse('create-checkout-session', args=[self.amount, self.user_id])
        self.stripe_webhook_url = reverse('stripe-webhook')

    @patch('stripe.checkout.Session.create')
    @patch('stripe.Customer.create')
    def test_create_checkout_session(self, mock_customer_create, mock_session_create):
        mock_customer_create.return_value = {'id': 'cus_test'}
        mock_session_create.return_value = {'id': 'sess_test'}

        response = self.client.get(self.create_checkout_session_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('sessionId', response.json())
        self.assertEqual(response.json()['sessionId'], 'sess_test')

    @patch('stripe.Event.construct_from')
    @patch('stripe.Customer.retrieve')
    def test_stripe_webhook(self, mock_customer_retrieve, mock_event_construct_from):
        mock_customer_retrieve.return_value = {
            'metadata': {'user_sid': self.user_id}
        }
        mock_event_construct_from.return_value = stripe.Event.construct_from({
            'type': 'payment_intent.succeeded',
            'data': {
                'object': {
                    'customer': 'cus_test',
                    'amount': 10000
                }
            }
        }, 'whsec_test')

        payload = {
            'id': 'evt_test',
            'type': 'payment_intent.succeeded',
            'data': {
                'object': {
                    'customer': 'cus_test',
                    'amount': 10000,
                }
            }
        }

        signature_header = 'whsec_test'
        response = self.client.post(self.stripe_webhook_url, data=json.dumps(payload), content_type='application/json', HTTP_STRIPE_SIGNATURE=signature_header)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_stripe_webhook_invalid_payload(self):
        payload = "invalid_payload"
        signature_header = 'whsec_test'
        response = self.client.post(self.stripe_webhook_url, data=payload, content_type='application/json', HTTP_STRIPE_SIGNATURE=signature_header)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)