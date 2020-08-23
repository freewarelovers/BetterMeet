from django.contrib import admin

from .models import CustomUser, Tag
# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    model =CustomUser
    fieldsets  = [
        ("General info", {'fields': ['profile_pic',  'first_name', "last_name" ]}),
        ('Details' , {'fields' : [ 'gender' , "date_birth",'email', 'phone']}),
        ("Position", {'fields' : ['adress', 'city', 'country']})
        ]

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    model =Tag
    fieldsets  = [
        ("General info", {'fields': ['name']}),
        ]