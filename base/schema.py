from graphene_django import DjangoObjectType

from base.models import *


class MembersType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'

class TagType(DjangoObjectType):
    class Meta:
        model  = Tag
        fields  = '__all__'