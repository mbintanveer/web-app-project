from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [

#Specialization
url(r'^api/Specializations$', views.specializations_list),
url(r'^api/Specializations/(?P<pk>[0-9]+)$', views.specialization_detail),

#Department
url(r'^api/Invoices$', views.invoices_list),
url(r'^api/Invoices/(?P<pk>[0-9]+)$', views.invoices_detail),
url(r'^api/InvoicesA/(?P<pk>[0-9]+)$', views.invoices_get_invoice_entries), #Get_Invoice_Entries

#Appointment

#Medicines



#Prescription
url(r'^api/Receivings$', views.receivings_list),
url(r'^api/Receivings/(?P<pk>[0-9]+)$', views.receivings_detail),

path('', views.Clients_Landing, name='Clients_Landing'),
path('Clients_View/<int:id>/', views.Clients_View, name='Clients_View'),

]

