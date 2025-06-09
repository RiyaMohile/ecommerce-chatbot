from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Product, ChatLog
from .serializers import ProductSerializer
from django.contrib.auth.models import User
from rest_framework import status

@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    User.objects.create_user(username=username, password=password)
    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def search_products(request):
    query = request.data.get('query', '')
    products = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def log_chat(request):
    session_id = request.data.get('session_id')
    message = request.data.get('message')
    sender = request.data.get('sender', 'user')
    ChatLog.objects.create(session_id=session_id, message=message, sender=sender)
    return Response({'status': 'logged'})

@api_view(['GET'])
def sample_products(request):
    sample = Product.objects.all()[:10]  # Return 10 sample products
    serializer = ProductSerializer(sample, many=True)
    return Response(serializer.data)