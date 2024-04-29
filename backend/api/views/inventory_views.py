from rest_framework.response import Response
from rest_framework.decorators import api_view
import os
import requests
from urllib.parse import quote

@api_view(['GET'])
def get_user_inventory(request):
    try:
        SA_KEY = os.getenv('STEAMAPI_KEY')
        user_id = request.data['steam_id']
        if (user_id == None):
            return Response({'Error': 'Provide user_id param'}, status=400)

        data = requests.get(f"https://www.steamwebapi.com/steam/api/inventory?key={SA_KEY}&steam_id={user_id}&sort=price_max&currency=USD")
        return Response({'inventory': data}, status=200)
    except Exception as e:
        return Response({'error': str(e), "req": request.data})

@api_view(['GET'])
def get_item_details(request):
    try:
        SA_KEY = os.getenv('STEAMAPI_KEY')
        inspect_link = request.data['inspect_link']
        if (inspect_link == None):
            return Response({'Error': 'Provide inspect_link param'}, status=400)
        
        inspect_link = quote(inspect_link)
        data = requests.get(f"https://www.steamwebapi.com/float/api/item?key={SA_KEY}&url={inspect_link}")
        return Response({'item_details': data}, status=200)
    except Exception as e:
        return Response({'error': str(e), "req": request.data})

