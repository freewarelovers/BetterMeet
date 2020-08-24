from django.core.exceptions import ValidationError
from django.conf import settings
from django.utils.translation import gettext as _
"""
this code is copied from 
http://www.learningaboutelectronics.com/Articles/How-to-restrict-the-size-of-file-uploads-with-Python-in-Django
"""

def validate_file_size(value):
    filesize= value.size
    
    if filesize > settings.MAX_FILE_SIZE:
        raise ValidationError(_("The maximum file size that can be uploaded is 5MB"))
    else:
        return value

def validate_image_size(value):
    filesize= value.size
    
    if filesize > settings.MAX_IMAGE_SIZE:
        raise ValidationError(_("The maximum image size that can be uploaded is 20MB"))
    else:
        return value
