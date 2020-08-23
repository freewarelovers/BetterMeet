from django.db import models
from django.utils.translation import ugettext_lazy as _


from base.models import Tag
# Create your models here.


class Community(models.Model):
    name = models.CharField(_('community name'), max_length=200)
    slug = models.SlugField(_('community slug'))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class CommunityOwner(models.Model):
     pass