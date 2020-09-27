from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.text import slugify

import shortuuid
from base.models import Tag,CustomUser
# Create your models here.


class Community(models.Model):
    key = models.CharField(unique=True, null=True , editable=False, max_length=500)
    name = models.CharField(_('community name'), max_length=200)
    slug = models.SlugField(_('community slug'),null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Community"
        verbose_name_plural = "Communitys"

    def save(self, *args, **kwargs):
        ''' On save, update timestamps ''' 
        self.key =  shortuuid.uuid()
        self.slug= slugify("{} {}".format(self.name,self.key))   
        super(Community, self).save(*args, **kwargs)
        

       

    def __str__(self):
        return str(self.name)

class CommunityOwner(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    community = models.ForeignKey(Community, on_delete=models.CASCADE )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Community owner"
        verbose_name_plural = "Community owners"

    def __str__(self):
        return str(self.owner.email)
