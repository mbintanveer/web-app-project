from rest_framework import serializers
from .models import Specialization,Prescription,Medicines,Department,Appointment

class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = ('specialization_id', 'specialization_desc')

class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ('prescription_id',
   'appointment',
    'medicines')

class MedicinesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('medicines_id',
        'medicines_qty',
        'medicines_name' )

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('department_id',
    'department_name',
    'department_location' )

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ('appointment_id',
                'appointment_time',)

