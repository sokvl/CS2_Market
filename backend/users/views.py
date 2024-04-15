from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from api.serializers.User_serializer import UserSerializer

@api_view(['GET'])
def get_user(request, steam_id):
    try:
        user = get_user_model().objects.get(steam_id=steam_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except get_user_model().DoesNotExist:
        return Response({'error': 'User with this steam_id does not exist'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_user(request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def edit_user(request, steam_id):
    try:
        user = get_user_model().objects.get(steam_id=steam_id)
    except get_user_model().DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(user, data=request.data, partial=True) 
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)