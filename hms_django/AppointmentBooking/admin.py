from django.contrib import admin
from .models import Demo, Department,Specialization,Medicines,Appointment, Prescription
# Register your models here.
admin.site.register(Department)

admin.site.register(Specialization)

admin.site.register(Medicines)

admin.site.register(Appointment)

admin.site.register(Prescription)


admin.site.register(Demo)

