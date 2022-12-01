from django import http
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt



@csrf_exempt 
def index(request):
    return render(request,'index.html')



@csrf_exempt 
def signIn(request):
    if request.method =="POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request,username=username,password = password)

        if user is not None:
            login(request,user)
            print("Correct")
            index = redirect('/')
            return index

        else:

            messages.info(request,"Username or Password is incorrect")
            print("Incorrect")
            index = redirect('/')
            return index


@csrf_exempt 
def signOut(request):
    logout(request)
    index = redirect('/')
    return index


@csrf_exempt 
def cashflows(request):
    return render(request,'cashflows.html')


@csrf_exempt 
def unavailable(request):
    return render(request,'unavailable.html')