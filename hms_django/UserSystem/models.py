import os
from django.db import models
from django.db.models.signals import post_save
from django.conf import settings
from django.dispatch import receiver

from django.contrib.auth.models import AbstractUser
from rest_framework.authtoken.models import Token

class User(AbstractUser):
    name = models.CharField(max_length=255)
    email= models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username=models.CharField(max_length=255)
    is_doctor=models.BooleanField(default=False)
    is_patient=models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

@receiver(post_save,sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender,instance=None,created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class Patient(models.Model):
    user=models.OneToOneField(User, related_name='patient',on_delete=models.CASCADE)
    address=models.CharField(max_length=255,blank=True)
    phone=models.IntegerField(blank=True,null=True)
    age=models.IntegerField(blank=True,null=True)
    gender=models.CharField(max_length=255,blank=True)


    def __str__(self):
        return self.user.username


class Doctor(models.Model):
    user=models.OneToOneField(User, related_name='doctor',on_delete=models.CASCADE)
    address=models.CharField(max_length=255,blank=True)
    phone=models.IntegerField(blank=True,null=True)
    age=models.IntegerField(blank=True,null=True)
    gender=models.CharField(max_length=255,blank=True)
    

    def __str__(self):
        return self.user.username
