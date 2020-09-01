from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django import forms
from django.utils.translation import ugettext_lazy as _
from django.core.validators import FileExtensionValidator
from .validators import validate_image_size
from .models import CustomUser

class MemberCreationForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super().__init__( *args, **kwargs)
        for field in ['first_name', 'last_name','email', 'password1', 'password2']:
            if field in self.fields:
                self.fields[field].widget.attrs.update({'class'  : 'form-control', 'placeholder': self.fields[field].label})

    profile_pic = forms.ImageField(label=(_('User profile picture')), 
            validators=[validate_image_size, FileExtensionValidator(['jpg','jpeg','png', 'webp', 'svg'])] , 
            required=False, 
            widget=forms.ClearableFileInput( attrs={'class' : 'file-input'}))
    class Meta(UserCreationForm):
        model = CustomUser
        fields = ['first_name', 'last_name','email','profile_pic', 'password1', 'password2']
        help_texts = {
            'password1': [_("Your password can’t be too similar to your other personal information."),
                        _("Your password must contain at least 8 characters."),
                        _("Your password can’t be a commonly used password."),
                        _('Your password can’t be entirely numeric.')]
        }
