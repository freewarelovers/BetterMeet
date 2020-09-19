from django import forms
from .models import CommunityOwner , Community
from base.validators import validate_image_size
from django.utils.translation import ugettext_lazy as _
from django.core.validators import FileExtensionValidator


class CommunityCreationForm(forms.ModelForm):
    class Meta:
        model  = Community
        fields = ['name']


class CommunityOwnerCreationForm(forms.ModelForm):
    class Meta:
        model  = CommunityOwner
        fields = ['owner', 'community']