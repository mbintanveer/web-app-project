import os
from django.db import models
import datetime
from datetime import date,datetime
from datetime import timedelta
from django.db.models import Sum

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    name = models.CharField(max_length=255)
    email= models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username=None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []