from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from models import Notification
from api.serializers.Notification_serializer import NotificationSerializer

@api_view(['GET'])
def get_notification(request, notification_id):
    try:
        notification = Notification.objects.get(notification_id=notification_id)
        serializer = NotificationSerializer(notification)
        return Response(serializer.data)
    except Notification.DoesNotExist:
        return Response({'error': 'Notification with this id does not exist'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_notification(request):
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Notification created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)