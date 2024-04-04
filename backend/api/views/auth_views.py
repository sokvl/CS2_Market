from django.shortcuts import redirect
from steamauth import auth, get_uid
from api.serializers.User_serializer import UserSerializer
from rest_framework.response import Response

import os
import requests

def steam_login(request):
    return auth('/callback', use_ssl=False)

def steam_login_callback(request):
    print("HWD", request)
    user = get_uid(request.GET)
    if user is None:
        return redirect('/failed')
    else:
        #TODO: Refactor to signals.py
        STEAMAPI_KEY = os.getenv('STEAMAPI_KEY')
        response = requests.get(
            'http://steamwebapi.com/steam/api/profile',
            params={
                'id': user,
                'key': STEAMAPI_KEY
            }
            )
        response = response.json()

        serializer = UserSerializer(data={
            'username': response['personaname'],
            'steam_id': user,
            'avatar_url': response['avatar'],
            'is_admin': False
        })
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return redirect('/')
        
        return redirect('/negro')

        