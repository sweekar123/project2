from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
from accounts.managers import UserManager

class Gender(models.TextChoices):
    MALE = "MALE" , "Male"
    FEMALE = "FEMALE" , "Female"
    OTHERS = "OTHERS", "Others"

class User(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(max_length=50,unique=True)
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100,null=True,blank=True)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    otp = models.CharField(max_length=4)
    gender = models.CharField(max_length=6,choices=Gender.choices,default=Gender.MALE)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('first_name','last_name','phone_number','gender')

    def __str__(self):
        return str(self.email)
        

