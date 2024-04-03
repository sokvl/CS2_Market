from django.http import JsonResponse
from .models import User
import json
from django.views.decorators.csrf import csrf_exempt

def get_user(request, steam_id):
    try:
        user = User.objects.get(steam_id=steam_id)
        user_data = {
            'user_id': user.user_id,
            'username': user.username,
            'steam_id': user.steam_id,
            'avatar_url': user.avatar_url,
            'steam_tradelink': user.steam_tradelink,
            'is_admin': user.is_admin
        }
        return JsonResponse(user_data)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User with this username does not exists'}, status=404)

# To jest dekorator do wyłączenia uwierzytelniania
#@csrf_exempt  # odkomentować do testowania postmanem 
def create_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = User.objects.create(
                user_id=data['user_id'],
                username=data['username'],
                steam_id=data['steam_id'],
                avatar_url=data['avatar_url'],
                steam_tradelink=data['steam_tradelink'],
                is_admin=data['is_admin']
            )
            return JsonResponse({'message': 'User created successfully'}, status=201)
        except KeyError:
            return JsonResponse({'error': 'Incorrect User data'}, status=400)
    else:
        return JsonResponse({'error': 'This method is not acceptable'}, status=405)