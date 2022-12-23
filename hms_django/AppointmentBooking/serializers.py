from rest_framework import serializers
from .models import  Specialization,Prescription,Medicines,Department,Appointment, Demo

class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = ('specialization_id', 'specialization_desc')

class DemoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demo
        fields = ('demo_id', 'demo_desc')




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
    
    patient = serializers.StringRelatedField(many=False)
    appointment_time = serializers.StringRelatedField(many=False)
    doctor = serializers.StringRelatedField(many=False)

    class Meta:
        model = Appointment
        fields = ('appointment_id',
                'appointment_time',
                'patient',
                'doctor',
                'description'
                )

