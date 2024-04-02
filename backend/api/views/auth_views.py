import requests
from rest_framework.views import APIView
from rest_framework.response import Response

from django.shortcuts import redirect
from social_django.utils import psa



@psa('social:complete')
def steam_login(request):
    # Funkcja inicjująca proces logowania przez Steam
    return redirect('/login/steam')

def steam_return(request):
    # Funkcja obsługująca powrót użytkownika z Steam
    user = request.backend.do_auth(request.GET)
    if user:
        # Użytkownik został pomyślnie uwierzytelniony
        print("Success")
        # Przekierowanie do strony domowej po pomyślnym zalogowaniu
        return redirect('home')
    else:
        # Obsługa nieudanej autentykacji
        return redirect('login_error')