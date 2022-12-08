from  django.urls import path
from .views import PatientSignupView, DoctorSignupView

urlpatterns = [

    path('signup/patient/', PatientSignupView.as_view()),
    path('signup/doctor/', DoctorSignupView.as_view()),


]