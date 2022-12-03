from rest_framework.views import APIView
from rest_framework.response import Response
from accounts.api.serializers import UserSerializer,VerifyOTPSerializer
from rest_framework import status
from accounts.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
from accounts.api.emails import send_otp_via_mail

class RegisterAPIView(APIView):

    def post(self,request):
        data = request.data
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            send_otp_via_mail(serializer.data['email'])
            return Response({
                'status' : status.HTTP_201_CREATED,
                'message' : "UserCreated Successfully",
                'data' : serializer.data
            })
        else:
            return Response({
                'status' : status.HTTP_400_BAD_REQUEST,
                'message' : "Something went Wrong",
                'error' : serializer.errors 
            })
class UserAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self,request):
        user_list = User.objects.all()
        serializer = UserSerializer(user_list,many=True)
        return Response({
            'status' : status.HTTP_200_OK,
            'data' : serializer.data
        })

class VerifyOTPView(APIView):

    def post(self,request):
        data = request.data
        print(data)
        serializer = VerifyOTPSerializer(data=data)
        if serializer.is_valid():
            email = serializer.data['email']
            otp = serializer.data['otp']

            user = User.objects.filter(email=email)
            if not user.exists():
                 return Response({
                    'status' : status.HTTP_400_BAD_REQUEST,
                    'message' : 'Something went wrong',
                    'data' : 'Invalid email'
                })
            if user[0].otp != otp:
                 return Response({
                    'status' : status.HTTP_400_BAD_REQUEST,
                    'message' : 'Something went wrong',
                    'data' : 'Wrong OTP'                    
                })

            user = user.first()
            user.is_staff = True
            user.is_verified = True
            user.save()
            return Response({
                    'status' : status.HTTP_200_OK,
                    'message' : 'Account is verified',
                    'data' : {},                 
            })
        return Response({
            'status' : status.HTTP_400_BAD_REQUEST,
            'message' : 'Something went wrong',
            'data' : serializer.errors             
        })





# class RegisterAPIView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = (AllowAny,)
#     serializer_class = UserSerializer

# class UserAPIView(generics.ListAPIView):
#     queryset = User.objects.all()
#     permission_classes = (IsAuthenticated,) 
#     serializer_class = UserSerializer

# class VerifyOTPView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = (IsAuthenticated,) 
#     serializer_class = UserSerializer

        
