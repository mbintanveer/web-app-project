from rest_framework import generics,permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from UserSystem.models import User
from .serializers import UserSerializer,PatientSignupSerializer, DoctorSignupSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from .permissions import IsPatientUser, IsDoctorUser

class PatientSignupView(generics.GenericAPIView):
    serializer_class=PatientSignupSerializer

    def post(self, request, *args, **kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        return Response ({"user": UserSerializer(user, context= self.get_serializer_context()).data,
        "token": Token.objects.get(user=user).key, 
        "message": "Account created successfully"})
    
    


class DoctorSignupView(generics.GenericAPIView):
    serializer_class=DoctorSignupSerializer

    def post(self, request, *args, **kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        return Response ({"user": UserSerializer(user, context= self.get_serializer_context()).data,
        "token": Token.objects.get(user=user).key, 
        "message": "Account created successfully"})

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer=self.serializer_class(data=request.data,
        context = {'request':request})
        serializer.is_valid(raise_exception=True)
        user=serializer.validated_data['user']
        token, created=Token.objects.get_or_create(user=user)
        return Response({
        'token': token.key,
        'user_id': user.pk,
        'is_patient': user.is_patient,
        })

class LogoutView(APIView):
    def post(self, request, format=None):
        request.auth.delete()
        return Response(status=status.HTTP_200_OK)

class PatientOnlyView(generics.RetrieveAPIView):
    permission_classes=[permissions.IsAuthenticated&IsPatientUser]
    serializer_class=UserSerializer

    def get_object(self):
        return self.request.user

class DoctorOnlyView(generics.RetrieveAPIView):
    permission_classes=[permissions.IsAuthenticated&IsDoctorUser]
    serializer_class=UserSerializer

    def get_object(self):
        return self.request.user