from datetime import datetime, timedelta
import json
import string
from django.http import response
from django.urls import reverse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from django.db.models import Q
from django.utils import timezone



from .serializers import GetPatientByDoctorSerializer, GetPrescriptionByDoctorSerializer, GetPrescriptionSerializer, PostAppointmentSerializer,  DepartmentSerializer, GetAppointmentByPatientSerializer, GetAppointmentByDoctorSerializer, MedicinesSerializer, PrescriptionForPharmacySerializer, PrescriptionSerializer
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.http import HttpResponse
from UserSystem.models import Patient, Doctor
from .models import Appointment,   Department, Prescription
from itertools import chain
from operator import attrgetter

#Department

@api_view(['GET', 'POST']) #Post for new
def departments_list(request):
    if request.method == 'GET':
        department = Department.objects.all()
        department_name_keyword = request.GET.get('department_name_keyword', None)
        if department_name_keyword is not None:
            department = department.filter(department_name__icontains=department_name_keyword)
        
        department_serializer = DepartmentSerializer(department, many=True)
        return JsonResponse(department_serializer.data, safe=False)

    elif request.method == 'POST':
        department_data = JSONParser().parse(request)
        department_serializer = DepartmentSerializer(data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse(department_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(department_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  
@api_view(['GET','PUT','DELETE'])
def departments_detail(request, pk):  
    try: 
        department = Department.objects.get(pk=pk) 
    except Department.DoesNotExist: 
        return JsonResponse({'message': 'The Department does not exist'}, status=status.HTTP_404_NOT_FOUND) 
    
    if request.method == 'GET': 
        department_serializer = DepartmentSerializer(department) 
        return JsonResponse(department_serializer.data) 

    elif request.method == 'PUT': 
        department_data = JSONParser().parse(request) 
        department_serializer = DepartmentSerializer(department, data=department_data) 
        if department_serializer.is_valid(): 
            department_serializer.save() 
            return JsonResponse(department_serializer.data) 
        return JsonResponse(department_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    elif request.method == 'DELETE': 
        department.delete() 
        return JsonResponse({'message': 'Department was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


#Appointment

@api_view(['GET', 'POST']) #Post for new
def appointments_list(request):
    if request.method == 'GET':
        appointment = Appointment.objects.all()
        appointment_name_keyword = request.GET.get('appointment_name_keyword', None)
        if appointment_name_keyword is not None:
            appointment = appointment.filter(appointment_name__icontains=appointment_name_keyword)
        
        appointment_serializer = GetAppointmentSerializer(appointment, many=True)
        return JsonResponse(appointment_serializer.data, safe=False)

    elif request.method == 'POST':
        appointment_data = JSONParser().parse(request)
        appointment_time_str = appointment_data['appointment_time']
        user_id = appointment_data['patient']
        doctor_id = appointment_data['doctor']
        appointment_time = datetime.strptime(appointment_time_str, '%Y-%m-%dT%H:%M')
        thirty_minutes_before = appointment_time - timedelta(minutes=30)
        thirty_minutes_after = appointment_time + timedelta(minutes=30)
        appointment_data['appointment_time'] = appointment_time

        try:
            # Check if the doctor already has an appointment 30 minutes before or after the chosen time
            appointment_exists = Appointment.objects.filter(
                Q(doctor_id=doctor_id) &
                (Q(appointment_time__gte=thirty_minutes_before) & Q(appointment_time__lt=appointment_time) |
                Q(appointment_time__gt=appointment_time) & Q(appointment_time__lte=thirty_minutes_after))
            ).exists()
            if appointment_exists:
                return JsonResponse({'message': 'Doctor already has an appointment scheduled 30 minutes before or after the chosen time.'},
                                    status=status.HTTP_400_BAD_REQUEST)
            # Get the patient object using the user_id
            patient = Patient.objects.get(user=user_id)
            appointment_data['patient'] = patient.pk
        except Patient.DoesNotExist:
            return JsonResponse({'message': 'The patient does not exist'}, status=status.HTTP_404_NOT_FOUND)
        appointment_serializer = PostAppointmentSerializer(data=appointment_data)
        if appointment_serializer.is_valid():
            appointment_serializer.save()
            return JsonResponse(appointment_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(appointment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET','PUT','DELETE'])
def appointments_detail(request, pk):  
    try: 
        appointment = Appointment.objects.get(pk=pk) 
    except Appointment.DoesNotExist: 
        return JsonResponse({'message': 'The Appointment does not exist'}, status=status.HTTP_404_NOT_FOUND) 
    
    if request.method == 'GET': 
        appointment_serializer = AppointmentSerializer(appointment) 
        return JsonResponse(appointment_serializer.data) 

    elif request.method == 'PUT': 
        appointment_data = JSONParser().parse(request) 
        appointment_serializer = AppointmentSerializer(appointment, data=appointment_data) 
        if appointment_serializer.is_valid(): 
            appointment_serializer.save() 
            return JsonResponse(appointment_serializer.data) 
        return JsonResponse(appointment_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    elif request.method == 'DELETE': 
        appointment.delete() 
        return JsonResponse({'message': 'Appointment was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET','PUT','DELETE'])
def appointmentsByPatient(request, pk):  
    if request.method == 'GET':
        patient = Patient.objects.get(user=pk) 
        patient=Patient.objects.get(pk=patient.pk)
        appointment = Appointment.objects.filter(patient=patient)
        appointment_name_keyword = request.GET.get('appointment_name_keyword', None)
        if appointment_name_keyword is not None:
            appointment = appointment.filter(appointment_name__icontains=appointment_name_keyword)
        
        appointment_serializer = GetAppointmentByPatientSerializer(appointment, many=True)
        return JsonResponse(appointment_serializer.data, safe=False)
       
    elif request.method == 'POST':
        appointment_data = JSONParser().parse(request)
        appointment_serializer = GetAppointmentByPatientSerializer(data=appointment_data)
        if appointment_serializer.is_valid():
            appointment_serializer.save()
            return JsonResponse(appointment_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(appointment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
def appointmentsByDoctor(request, pk):  
    if request.method == 'GET':
        doctor = Doctor.objects.get(user=pk) 
        doctor=Doctor.objects.get(pk=doctor.pk)
        appointment = Appointment.objects.filter(doctor=doctor)
        appointment_name_keyword = request.GET.get('appointment_name_keyword', None)
        if appointment_name_keyword is not None:
            appointment = appointment.filter(appointment_name__icontains=appointment_name_keyword)
        
        appointment_serializer = GetAppointmentByDoctorSerializer(appointment, many=True)
        return JsonResponse(appointment_serializer.data, safe=False)
       
    elif request.method == 'POST':
        appointment_data = JSONParser().parse(request)
        appointment_serializer = GetAppointmentByDoctorSerializer(data=appointment_data)
        if appointment_serializer.is_valid():
            appointment_serializer.save()
            return JsonResponse(appointment_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(appointment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
def prescriptionsByDoctor(request, pk):  
    if request.method == 'GET':
        doctor = Doctor.objects.get(user=pk) 
        doctor=Doctor.objects.get(pk=doctor.pk)
        prescription = Prescription.objects.filter(doctor=doctor)
        prescription_name_keyword = request.GET.get('prescription_name_keyword', None)
        if prescription_name_keyword is not None:
            prescription = prescription.filter(prescription_name__icontains=prescription_name_keyword)
        
        prescription_serializer = GetPrescriptionByDoctorSerializer(prescription, many=True)
        return JsonResponse(prescription_serializer.data, safe=False)
       
    elif request.method == 'POST':
        prescription_data = JSONParser().parse(request)
        prescription_serializer = GetPrescriptionByDoctorSerializer(data=prescription_data)
        if prescription_serializer.is_valid():
            prescription_serializer.save()
            return JsonResponse(prescription_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(prescription_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
#PaientsByDoctor---

@api_view(['GET','PUT','DELETE'])
def patientsByDoctor(request, pk):  
    if request.method == 'GET':
        print("thisapi.")
        doctor = Doctor.objects.get(user=pk) 
        doctor=Doctor.objects.get(pk=doctor.pk)
        doctor_appointments = Appointment.objects.filter(doctor=doctor)
        appointment_name_keyword = request.GET.get('appointment_name_keyword', None)
        if appointment_name_keyword is not None:
            # doctor_appointments = doctor_appointments.filter(appointment_name__icontains=appointment_name_keyword)
            patients = Patient.objects.filter(id__in=doctor_appointments.values_list('patient_id', flat=True))
            # patients = Patient.objects.filter(appointment__in=doctor_appointments)

        patients = Patient.objects.filter(id__in=doctor_appointments.values_list('patient_id', flat=True))
        patient_serializer = GetPatientByDoctorSerializer(patients, many=True)
        
        return JsonResponse(patient_serializer.data, safe=False)
       
    elif request.method == 'POST':
        patient_data = JSONParser().parse(request)
        patient_serializer = GetPatientByDoctorSerializer(data=patient_data)
        if patient_serializer.is_valid():
            patient_serializer.save()
            return JsonResponse(patient_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(patient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Prescriptions

@api_view(['GET', 'POST']) #Post for new
def prescriptions_list(request):
    if request.method == 'GET':
        prescription = Prescription.objects.all()
        prescription_name_keyword = request.GET.get('prescription_name_keyword', None)
        if prescription_name_keyword is not None:
            prescription = prescription.filter(prescription_name__icontains=prescription_name_keyword)
        
        prescription_serializer = PrescriptionSerializer(prescription, many=True)
        return JsonResponse(prescription_serializer.data, safe=False)

    elif request.method == 'POST':
        prescription_data = JSONParser().parse(request)
        prescription_serializer = PrescriptionSerializer(data=prescription_data)
        if prescription_serializer.is_valid():
            prescription_serializer.save()
            return JsonResponse(prescription_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(prescription_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
def prescriptions_detail(request, pk):  
    try: 
        prescription = Prescription.objects.get(pk=pk) 
    except Prescription.DoesNotExist: 
        return JsonResponse({'message': 'The Prescription does not exist'}, status=status.HTTP_404_NOT_FOUND) 
    
    if request.method == 'GET': 
        prescription_serializer = PrescriptionSerializer(prescription) 
        return JsonResponse(prescription_serializer.data) 

    elif request.method == 'PUT': 
        prescription_data = JSONParser().parse(request) 
        prescription_serializer = PrescriptionSerializer(prescription, data=prescription_data) 
        if prescription_serializer.is_valid(): 
            prescription_serializer.save() 
            return JsonResponse(prescription_serializer.data) 
        return JsonResponse(prescription_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    elif request.method == 'DELETE': 
        prescription.delete() 
        return JsonResponse({'message': 'Prescription was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST']) #Post for new
def prescriptionsForPharmacy(request):
    if request.method == 'GET':
        prescription = Prescription.objects.all()
        prescription_name_keyword = request.GET.get('prescription_name_keyword', None)
        if prescription_name_keyword is not None:
            prescription = prescription.filter(prescription_name__icontains=prescription_name_keyword)
        
        prescription_serializer = PrescriptionForPharmacySerializer(prescription, many=True)
        return JsonResponse(prescription_serializer.data, safe=False)

    elif request.method == 'POST':
        prescription_data = JSONParser().parse(request)
        prescription_serializer = PrescriptionSerializer(data=prescription_data)
        if prescription_serializer.is_valid():
            prescription_serializer.save()
            return JsonResponse(prescription_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(prescription_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  

@api_view(['GET','PUT','DELETE'])
def prescriptionsByPatient(request, pk):  
    if request.method == 'GET':
        patient = Patient.objects.get(user=pk) 
        patient=Patient.objects.get(pk=patient.pk)
        prescription = Prescription.objects.filter(patient=patient)
        prescription_name_keyword = request.GET.get('prescription_name_keyword', None)
        if prescription_name_keyword is not None:
            prescription = prescription.filter(prescription_name__icontains=prescription_name_keyword)
        
        prescription_serializer = GetPrescriptionSerializer(prescription, many=True)
        return JsonResponse(prescription_serializer.data, safe=False)
       
    elif request.method == 'POST':
        prescription_data = JSONParser().parse(request)
        prescription_serializer = PrescriptionSerializer(data=prescription_data)
        if prescription_serializer.is_valid():
            prescription_serializer.save()
            return JsonResponse(prescription_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(prescription_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def Clients_View(request):
    return HttpResponse("")


@api_view(['GET'])
def MedicalHistoryByPatient(request, pk):  
    try: 
        client = Client.objects.get(pk=pk) 
    except Client.DoesNotExist: 
        return JsonResponse({'message': 'The Client does not exist'}, status=status.HTTP_404_NOT_FOUND) 
    
    if request.method == 'GET': 
        return JsonResponse(
            {"client_name":client.client_name,
            "get_one_month": client.get_one_month(),
            "get_two_month" : client.get_two_month(),
            "get_three_month":client.get_three_month(),
            "get_four_month":client.get_four_month(),
            "get_total":client.get_total()
            },safe=False)


