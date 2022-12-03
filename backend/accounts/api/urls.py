from django.urls import path
from accounts.api.views import RegisterAPIView,UserAPIView,VerifyOTPView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [ 
    path('register/',RegisterAPIView.as_view(),name='user-register'),
    path('verify/',VerifyOTPView.as_view(),name='user-verify'),
    path('list/',UserAPIView.as_view(),name='user-list'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]



# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

# urlpatterns = [
#     ...
#     path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
#     ...
# ]