from graphene_django import DjangoObjectType
from .models import Event


class EventType(DjangoObjectType):
    class Meta:
        model = Event
        fields = '__all__'