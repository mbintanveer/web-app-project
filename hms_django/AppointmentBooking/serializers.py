from rest_framework import serializers
from .models import  Prescription,Department,Appointment




class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ('prescription_id',
   'appointment_id',
    'description')


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

#THIS IS NOT MAIN GETTING SERIALIZER.
class PostAppointmentSerializer(serializers.ModelSerializer):
    
    # patient = serializers.StringRelatedField(many=False)
    # doctor = serializers.StringRelatedField(many=False)
    appointment_time = serializers.DateTimeField(input_formats=['%Y-%m-%dT%H:%M'])

    class Meta:
        model = Appointment
        fields = ('appointment_id',
                'patient',
                'doctor',
                'description',
                'appointment_time'
                )

class GetAppointmentSerializer(serializers.ModelSerializer):
    
    patient = serializers.StringRelatedField(many=False)
    doctor = serializers.StringRelatedField(many=False)
    # appointment_time = serializers.DateTimeField(input_formats=['%Y-%m-%dT%H:%M'])

    class Meta:
        model = Appointment
        fields = ('appointment_id',
                'patient',
                'doctor',
                'description',
                'appointment_time'
                )


class GetPrescriptionSerializer(serializers.ModelSerializer):
    
    patient = serializers.StringRelatedField(many=False)
    # doctor = serializers.StringRelatedField(many=False)
    # appointment_time = serializers.DateTimeField(input_formats=['%Y-%m-%dT%H:%M'])

    class Meta:
        model = Prescription
        fields = ('prescription_id',
                'description',
               'patient',
               'appointment_id')