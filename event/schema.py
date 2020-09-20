from graphene_django import DjangoObjectType
from .models import Event
from .forms import EventCreationForm
import graphene
from graphene_django.forms.mutation import DjangoModelFormMutation

class EventType(DjangoObjectType):
    class Meta:
        model = Event
        fields = '__all__'


class Query(graphene.ObjectType):
    all_events = graphene.List(EventType)


class EventsOwnersMutation(DjangoModelFormMutation):
    community_owner =  graphene.Field(EventType)
    class Meta:
        form_class = EventCreationForm


### main mutation
class Mutation(graphene.ObjectType):
    add_community_event = EventsOwnersMutation.Field()
