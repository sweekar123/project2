from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self,email,password=None,**extra_fields):
        if not email:
            return ValueError("Email is required.")
        email = self.normalize_email(email).lower()
        user = self.model(email=email,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,email,password=None,**extra_fields):
        user = self.create_user(email,password,**extra_fields)
        user.is_superuser = True
        user.is_active = True
        user.is_staff = True
        user.is_verified = True
        user.save(using=self._db)
        return user