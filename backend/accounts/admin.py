from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from accounts.models import User,Gender

class UserAdmin(BaseUserAdmin):
    ordering = ['email']

    fieldsets = (
        (None,{'fields' : ('email','password','first_name','last_name','phone_number','gender')}),
        ('Permissions',{'fields' : (
            'is_active',
            'is_staff',
            'is_verified',
            'is_superuser',
            'groups',
            'user_permissions'
        )}),
    )

    add_fieldsets = (
        (
            None,
            {
                'classes' : ('wide',),
                'fields' : ('email','first_name','last_name','phone_number','gender','password1','password2')
            }
        ),
    )

    list_display = ('email','first_name','last_name','phone_number','otp','gender','is_verified','is_active','created','updated')
    list_filter = ('is_active','is_staff','is_verified','is_verified')
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ('groups','user_permissions',)


admin.site.register(User,UserAdmin)
# admin.site.register(Gender)