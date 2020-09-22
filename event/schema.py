from graphene_django import DjangoObjectType
from .models import Event
from .forms import EventCreationForm
import graphene
from graphene_django.forms.mutation import DjangoModelFormMutation

from graphql_jwt.decorators import login_required

class EventType(DjangoObjectType):
    class Meta:
        model = Event
        fields = '__all__'


class Query(graphene.ObjectType):
    all_events = graphene.List(EventType)


class EventsMutation(DjangoModelFormMutation):
    event =  graphene.Field(EventType)
    @login_required
    def resolve_event(root, info, **kwargs):
        return root.event
    class Meta:
        form_class = EventCreationForm


### main mutation
class Mutation(graphene.ObjectType):
    add_community_event =  EventsMutation.Field()
