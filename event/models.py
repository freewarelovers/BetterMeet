from django.db import models
from django.utils.translation import ugettext_lazy as _

from community.models import CommunityOwner
from base.models import CustomUser
from django.utils.text import slugify
# Create your models here.
class Event(models.Model):
    name = models.CharField(_('event name'),max_length=500 )
    slug = models.SlugField(_('event slug'))
    event_creator  = models.ForeignKey(CommunityOwner, verbose_name=_('event creator'),null=True, blank=False, on_delete=models.CASCADE)
    description = models.TextField(max_length=300, null=True, blank=False)    
    position = models.CharField('event place,  city',max_length=200)
    start_at = models.DateField(_('event starting date'))
    end_at = models.DateField(_('event ending date'), null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Event"
        verbose_name_plural = "Events"
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''    
        self.slug= slugify("{}".format(self.name)) 
        super(Event, self).save(*args, **kwargs)
        
    
    def __str__(self):
        return str(self.name)
    
class EventJoinRequest(models.Model):
    member =  models.ForeignKey(CustomUser, verbose_name=_("user who sent request"),on_delete=models.CASCADE)
    event = models.ForeignKey(Event, verbose_name=_("request to joing this event"), on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if member.pk == event.event_creator.owner.pk:
            raise Exception("Owner can not join his own events")
        super(EventJoinRequest, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.member.email)