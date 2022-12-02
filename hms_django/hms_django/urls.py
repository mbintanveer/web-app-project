

from django.conf.urls import url,include
from django.contrib import admin
from django.urls import path,include
from . import view

urlpatterns = [

    url(r'^', include('AppointmentBooking.urls')),

    path('api/', include('UserSystem.urls')),

    
    #Default
    path('', view.index, name='index'),
    path('admin/', admin.site.urls,name='admin'),
    path('signIn/',view.signIn,name='signIn'),
    path('signOut/',view.signOut,name='signOut'),
    path('unavailable/',view.unavailable,name='unavailable')

]
