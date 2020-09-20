from django import forms
from .models import Event

class EventCreationForm(forms.ModelForm):
    class Meta:
        model  = Event
        fields = ['name', 'event_creator', 'description', 'postion', 'start_at']