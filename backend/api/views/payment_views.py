import requests
import stripe
import os

from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

from api.signals import payment_successful


@csrf_exempt
@api_view(['GET'])
def create_checkout_session(request):
    try:
        amount = request.data['amount']
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
    

@api_view(['GET'])
def stripe_succesfull_payment_hook(request):
    domain_url = 'http://localhost:8000/'
    stripe.api_key = os.getenv('SECRET_STRIPE_API_KEY')
    endpoint_secret = os.getenv('STRIPE_ENDPOINT_SECRET')
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        return Response(status=400)
    except stripe.error.SignatureVerificationError as e:
        return Response(status=400)

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        user_id = session.get('metadata', {}).get('user_id')
        amount = session.get('amount_total') / 100
        try:
            payment_successful.send(sender=None, user=user_id, amount=amount)
        except e:
            return Response({'message': f"{e}"}, status=400)
        
        return Response(status=200)
 
    return Response({'message': 'Unhandled event type'}, status=400)

    