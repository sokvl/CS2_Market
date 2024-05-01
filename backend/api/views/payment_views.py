import requests
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
import stripe
import os

@csrf_exempt
@api_view(['GET'])
def create_checkout_session(request, amount):

    try:
        
        domain_url = 'http://localhost:8000/'
        stripe.api_key = os.getenv('SECRET_STRIPE_API_KEY')
        checkout_session = stripe.checkout.Session.create(
            success_url=domain_url + 'success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=domain_url + 'cancelled/',
            payment_method_types=['card'],
            mode='payment',
            line_items=[{
                'price_data': {
                    'product_data': {'name': 'Balance refill'},
                    'currency': 'usd',
                    'unit_amount': amount*100,
                },
                'quantity': 1
            }]
        )
        return Response({'sessionId': checkout_session['id']})
    except Exception as e:
        return Response({'error': str(e), "req": request.data})
