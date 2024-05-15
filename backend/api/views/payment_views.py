from django.http import HttpResponse
from django.shortcuts import redirect
import requests
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
import stripe
import os
import json

@csrf_exempt
@api_view(['GET'])
def create_checkout_session(request, amount):
    try:
        domain_url = 'http://localhost:8000/'
        stripe.api_key = os.getenv('SECRET_STRIPE_API_KEY')
        checkout_session = stripe.checkout.Session.create(
            success_url=domain_url + 'success?session_id={CHECKOUT_SESSION_ID}&amount={amount}/',
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

@csrf_exempt
def stripe_webhook(request):
  payload = request.body
  event = None

  try:
    event = stripe.Event.construct_from(
      json.loads(payload), stripe.api_key
    )
  except ValueError as e:
    # Invalid payload
    return HttpResponse(status=400)

  # Handle the event
  if event.type == 'payment_intent.succeeded':
    payment_intent = event.data.object # contains a stripe.PaymentIntent
    # Then define and call a method to handle the successful payment intent.
    # handle_payment_intent_succeeded(payment_intent)
  elif event.type == 'payment_method.attached':
    payment_method = event.data.object # contains a stripe.PaymentMethod
    # Then define and call a method to handle the successful attachment of a PaymentMethod.
    # handle_payment_method_attached(payment_method)
  # ... handle other event types
  else:
    print('Unhandled event type {}'.format(event.type))

  return redirect("http://localhost:3001/")