import os
from django.db import models
import datetime
from datetime import date,datetime
from datetime import timedelta
from django.db.models import Sum

class Specialization(models.Model):
    specialization_id = models.AutoField(primary_key=True)
    specialization_desc = models.CharField(max_length=255)

    def __str__(self):
        return self.specialization_desc

class Demo(models.Model):
    demo_id = models.AutoField(primary_key=True)
    demo_desc = models.CharField(max_length=255)

    def __str__(self):
        return self.demo_desc


class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    department_name=models.CharField(max_length=255)
    department_location = models.CharField(max_length=255)

    def __str__(self):
        return self.department_name

class Appointment(models.Model):
    appointment_id = models.AutoField(primary_key=True)
    appointment_time = models.DateTimeField
    # patient=models.ForeignKey(Patient,on_delete=models.CASCADE)
    # doctor = models.ForeignKey(Doctor,on_delete=models.CASCADE)
   
    def __str__(self):
        return "To be Set"


class Medicines(models.Model):
    medicines_id=models.AutoField(primary_key=True)
    medicines_qty = models.IntegerField()
    medicines_name = models.CharField(max_length=255)

    def __str__(self):
        return "To be set"


class Prescription(models.Model):
    prescription_id=models.AutoField(primary_key=True)
    # patient = models.ForeignKey(Patient,on_delete=models.CASCADE)
    appointment = models.ForeignKey(Appointment,on_delete=models.CASCADE)
    # doctor = models.ForeignKey(Doctor,on_delete=models.CASCADE)
    medicines = models.ForeignKey(Medicines, on_delete=models.CASCADE)

    def __str__(self):
        return "To be set"