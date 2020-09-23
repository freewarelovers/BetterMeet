from django.db import models
from django.utils.translation import ugettext_lazy as _

from community.models import CommunityOwner

from django.utils.text import slugify
# Create your models here.
class Event(models.Model):
    name = models.CharField(_('event name'),max_length=500 )
    slug = models.SlugField(_('event slug'))
    event_creator  = models.ForeignKey(CommunityOwner, verbose_name=_('event creator'),null=True, blank=False, on_delete=models.CASCADE)
    description = models.TextField(max_length=300, null=True, blank=False)    
    position = models.CharField('event place,  city or country',max_length=200)
    start_at = models.DateField(_('event starting date'))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Event"
        verbose_name_plural = "Events"
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''    
                
        super(Event, self).save(*args, **kwargs)
        self.slug= slugify("{} {}".format(self.name,self.pk)) 
    
    def __str__(self):
        return str(self.name)
    