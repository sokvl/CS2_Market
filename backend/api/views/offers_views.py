from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def testget(request):
    test = {'hello': 'worlds'}
    return Response(test)