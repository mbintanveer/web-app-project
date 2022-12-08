from  django.urls import path
from .views import PatientSignupView, DoctorSignupView,CustomAuthToken, LogoutView, PatientOnlyView, DoctorOnlyView

urlpatterns = [

    path('signup/patient/', PatientSignupView.as_view()),
    path('signup/doctor/', DoctorSignupView.as_view()),

    #LOGIN/LOGOUT
    path('login/', CustomAuthToken.as_view(), name='auth_token'),
    path('logout/', LogoutView.as_view()),

    path('patient/dashboard', PatientOnlyView.as_view()),
    path('doctor/dashboard', DoctorOnlyView.as_view()),



]