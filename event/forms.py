from django import forms
from .models import Event

class EventCreationForm(forms.ModelForm):
    class Meta:
        model  = Event
        fields = ['name', 'event_creator', 'description', 'position', 'start_at', 'end_at']