from graphene_django import DjangoObjectType
from .models import Event
import graphene

class EventType(DjangoObjectType):
    class Meta:
        model = Event
        fields = '__all__'


class Query(graphene.ObjectType):
    all_events = graphene.List(EventType)

