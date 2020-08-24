from django.contrib import admin
from .models import  Event
# Register your models here.
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    model =Event
    fieldsets  = [
        ("General info", {'fields': ['name', 'event_creator', 'postion']}),
        ("Date and time info", {"fields" : ['start_at']})
        ]