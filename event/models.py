from django.db import models
from django.utils.translation import ugettext_lazy as _

from community.models import CommunityOwner
# Create your models here.
class Event(models.Model):
    name = models.CharField(_('event name'),max_length=500 )
    event_creator  = models.ForeignKey(CommunityOwner, verbose_name=_('event creator'),null=True, blank=False, on_delete=models.CASCADE)
    slug = models.SlugField(_('event slug'))
    start_at = models.DateField(_('event starting date'))
    postion = models.CharField('event place,  city or country',max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)