from django.http import response
from django.urls import reverse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from .serializers import ClientSerializer, InvoiceSerializer, ReceivingSerializer, SpecializationSerializer
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from .models import Specialization, Invoice_Entry,Receiving,Invoice
from itertools import chain
from operator import attrgetter

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

     
#INVOICES

@api_view(['GET', 'POST']) #Post for new
def invoices_list(request):
  
    if request.method == 'GET':
        invoice = Invoice.objects.all()
        invoice_description_keyword = request.GET.get('invoice_description_keyword', None)
        if invoice_description_keyword is not None:   
            invoice = invoice.filter(invoice_description__icontains=invoice_description_keyword)
        invoice_description_keyword = request.GET.get('invoice_description_keyword', None)
        invoice_client_id = request.GET.get('invoice_client_id', None)
        if invoice_client_id is not None:
            invoice = invoice.filter(invoice_client=invoice_client_id)
        
        invoice_serializer = InvoiceSerializer(invoice, many=True)
        return JsonResponse(invoice_serializer.data, safe=False)

    elif request.method == 'POST':
        invoice_data = JSONParser().parse(request)
        invoice_serializer = InvoiceSerializer(data=invoice_data)
        if invoice_serializer.is_valid():
            invoice_serializer.save()
            return JsonResponse(invoice_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(invoice_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
def invoices_detail(request, pk):  
    try: 
        invoice = Invoice.objects.get(pk=pk) 
    except Invoice.DoesNotExist: 
        return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND) 
    
    if request.method == 'GET': 
        invoice_serializer = InvoiceSerializer(invoice) 
        return JsonResponse(invoice_serializer.data) 

    elif request.method == 'PUT': 
        invoice_data = JSONParser().parse(request) 
        invoice_serializer = InvoiceSerializer(invoice, data=invoice_data) 
        if invoice_serializer.is_valid(): 
            invoice_serializer.save() 
            return JsonResponse(invoice_serializer.data) 
        return JsonResponse(invoice_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    elif request.method == 'DELETE': 
        invoice.delete() 
        return JsonResponse({'message': 'Invoice was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        
#RECEIVING

@api_view(['GET', 'POST']) #Post for new
def receivings_list(request):
    if request.method == 'GET':
        receiving = Receiving.objects.all()
        receiving_description_keyword = request.GET.get('receiving_description_keyword', None)
        if receiving_description_keyword is not None:   
            receiving = receiving.filter(receiving_description__icontains=receiving_description_keyword)
        receiving_description_keyword = request.GET.get('receiving_description_keyword', None)
        receiving_serializer = ReceivingSerializer(receiving, many=True)
        return JsonResponse(receiving_serializer.data, safe=False)

    elif request.method == 'POST':
        receiving_data = JSONParser().parse(request)
        receiving_serializer = ReceivingSerializer(data=receiving_data)
        if receiving_serializer.is_valid():
            receiving_serializer.save()
            return JsonResponse(receiving_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(receiving_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT','DELETE'])
def receivings_detail(request, pk):  
    try: 
        receiving = Receiving.objects.get(pk=pk) 
    except Receiving.DoesNotExist: 
        return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND) 
    
    if request.method == 'GET': 
        receiving_serializer = ReceivingSerializer(receiving) 
        return JsonResponse(receiving_serializer.data) 

    elif request.method == 'PUT': 
        receiving_data = JSONParser().parse(request) 
        receiving_serializer = ReceivingSerializer(receiving, data=receiving_data) 
        if receiving_serializer.is_valid(): 
            receiving_serializer.save() 
            return JsonResponse(receiving_serializer.data) 
        return JsonResponse(receiving_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    elif request.method == 'DELETE': 
        receiving.delete() 
        return JsonResponse({'message': 'Invoice was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


# Create your views here.
def Clients_Landing(request):
    ClientsList = Client.objects.all()
    params = {'ClientsList':ClientsList}
    return render(request,'Clients_Landing.html',params)



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


