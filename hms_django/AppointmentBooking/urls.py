from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [

#Specialization
url(r'^api/Specializations$', views.specializations_list),
url(r'^api/Specializations/(?P<pk>[0-9]+)$', views.specializations_detail),

#Department
url(r'^api/Departments$', views.departments_list),
url(r'^api/Departments/(?P<pk>[0-9]+)$', views.departments_detail),

url(r'^api/demos$', views.demos_list),
url(r'^api/demos/(?P<pk>[0-9]+)$', views.demos_detail),


#Appointment
url(r'^api/Appointments$', views.appointments_list),
url(r'^api/Appointments/(?P<pk>[0-9]+)$', views.appointments_detail),
url(r'^api/AppointmentsByPatient/(?P<pk>[0-9]+)$', views.appointmentsByPatient),


#Medicines

url(r'^api/Medicines$', views.medicines_list),
url(r'^api/Medicines/(?P<pk>[0-9]+)$', views.medicines_detail),


#Prescription
url(r'^api/Prescriptions$', views.prescriptions_list),
url(r'^api/Prescriptions/(?P<pk>[0-9]+)$', views.prescriptions_detail),

path('', views.Clients_Landing, name='Clients_Landing'),
path('Clients_View/<int:id>/', views.Clients_View, name='Clients_View'),

]

