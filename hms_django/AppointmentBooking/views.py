import json
import string
from django.http import response
from django.urls import reverse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from .serializers import  AppointmentSerializer, DemoSerializer, DepartmentSerializer,  MedicinesSerializer, PrescriptionSerializer,  SpecializationSerializer
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.http import HttpResponse

from .models import Appointment, Demo,  Department, Medicines, Prescription, Specialization
from itertools import chain
from operator import attrgetter

#Specialization

@api_view(['GET', 'POST']) #Post for new
def specializations_list(request):
    if request.method == 'GET':
        specialization = Specialization.objects.all()
        specialization_name_keyword = request.GET.get('specialization_name_keyword', None)
        if specialization_name_keyword is not None:
            specialization = specialization.filter(specialization_name__icontains=specialization_name_keyword)
        
        specialization_serializer = SpecializationSerializer(specialization, many=True)
        return JsonResponse(specialization_serializer.data, safe=False)

    elif request.method == 'POST':
        specialization_data = JSONParser().parse(request)
        specialization_serializer = SpecializationSerializer(data=specialization_data)
        if specialization_serializer.is_valid():
            specialization_serializer.save()
            return JsonResponse(specialization_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(specialization_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  
@api_view(['GET','PUT','DELETE'])
def specializations_detail(request, pk):  
    try: 
        specialization = Specialization.objects.get(pk=pk) 
    except Specialization.DoesNotExist: 
        return JsonResponse({'message': 'The Specialization does not exist'}, status=status.HTTP_404_NOT_FOUND) 
    
    if request.method == 'GET': 
        specialization_serializer = SpecializationSerializer(specialization) 
        return JsonResponse(specialization_serializer.data) 

    elif request.method == 'PUT': 
        specialization_data = JSONParser().parse(request) 
        specialization_serializer = SpecializationSerializer(specialization, data=specialization_data) 
        if specialization_serializer.is_valid(): 
            specialization_serializer.save() 
            return JsonResponse(specialization_serializer.data) 
        return JsonResponse(specialization_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    elif request.method == 'DELETE': 
        specialization.delete() 
        return JsonResponse({'message': 'Specialization was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

#DEMO
@api_view(['GET', 'POST']) #Post for new
def demos_list(request):
    if request.method == 'GET':
        demo = Demo.objects.all()
        demo_name_keyword = request.GET.get('demo_name_keyword', None)
        if demo_name_keyword is not None:
            demo = demo.filter(demo_name__icontains=demo_name_keyword)
        
        demo_serializer = DemoSerializer(demo, many=True)
        return JsonResponse(demo_serializer.data, safe=False)

    elif request.method == 'POST':
        demo_data = JSONParser().parse(request)
        demo_serializer = DemoSerializer(data=demo_data)
        if demo_serializer.is_valid():
            demo_serializer.save()
            return JsonResponse(demo_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(demo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  
@api_view(['GET','PUT','DELETE'])
def demos_detail(request, pk):  
    try: 
        demo = Demo.objects.get(pk=pk) 
    except Demo.DoesNotExist: 
        return JsonResponse({'message': 'The Demo does not exist'}, status=status.HTTP_404_NOT_FOUND) 
    
    if request.method == 'GET': 
        demo_serializer = DemoSerializer(demo) 
        return JsonResponse(demo_serializer.data) 

    elif request.method == 'PUT': 
        demo_data = JSONParser().parse(request) 
        demo_serializer = DemoSerializer(demo, data=demo_data) 
        if demo_serializer.is_valid(): 
            demo_serializer.save() 
            return JsonResponse(demo_serializer.data) 
        return JsonResponse(demo_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    elif request.method == 'DELETE': 
        demo.delete() 
        return JsonResponse({'message': 'Demo was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

 

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
        appointment_serializer = AppointmentSerializer(appointment, many=True)
        # print(appointment_serializer.data)
        return JsonResponse((appointment_serializer.data), safe=False)
      

    elif request.method == 'POST':
        appointment_data = JSONParser().parse(request)
        appointment_serializer = AppointmentSerializer(data=appointment_data)
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


#Medicines

@api_view(['GET', 'POST']) #Post for new
def medicines_list(request):
    if request.method == 'GET':
        medicine = Medicines.objects.all()
        medicine_name_keyword = request.GET.get('medicine_name_keyword', None)
        if medicine_name_keyword is not None:
            medicine = medicine.filter(medicine_name__icontains=medicine_name_keyword)
        medicine_serializer = MedicinesSerializer(medicine, many=True)
        return JsonResponse(medicine_serializer.data, safe=False)

    elif request.method == 'POST':
        medicine_data = JSONParser().parse(request)
        medicine_serializer = MedicinesSerializer(data=medicine_data)
        if medicine_serializer.is_valid():
            medicine_serializer.save()
            return JsonResponse(medicine_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(medicine_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  
@api_view(['GET','PUT','DELETE'])
def medicines_detail(request, pk):  
    try: 
        medicine = Medicines.objects.get(pk=pk) 
    except Medicines.DoesNotExist: 
        return JsonResponse({'message': 'The Medicine does not exist'}, status=status.HTTP_404_NOT_FOUND) 
    
    if request.method == 'GET': 
        medicine_serializer = MedicinesSerializer(medicine) 
        return JsonResponse(medicine_serializer.data) 

    elif request.method == 'PUT': 
        medicine_data = JSONParser().parse(request) 
        medicine_serializer = MedicinesSerializer(medicine, data=medicine_data) 
        if medicine_serializer.is_valid(): 
            medicine_serializer.save() 
            return JsonResponse(medicine_serializer.data) 
        return JsonResponse(medicine_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    elif request.method == 'DELETE': 
        medicine.delete() 
        return JsonResponse({'message': 'Medicine was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

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


# Homepage
def Clients_Landing(request):
    # # ClientsList = Client.objects.all()
    # params = {'ClientsList':ClientsList}
    # return render(request,'Clients_Landing.html',params)
    return HttpResponse("")

def Clients_View(request):
    return HttpResponse("")


@api_view(['GET'])
def clients_summary(request, pk):  
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


