from graphene_django import DjangoObjectType
from .models import Event
from .forms import EventCreationForm
import graphene
from graphql_jwt.decorators import login_required
from graphene_django.forms.mutation import DjangoModelFormMutation


class EventType(DjangoObjectType):
    class Meta:
        model = Event
        fields = ['name', 'slug', 'event_creator', 'description', 'position', 'start_at']


class Query(graphene.ObjectType):
    all_events = graphene.List(EventType)


class EventsMutation(DjangoModelFormMutation):
    event =  graphene.Field(EventType)

    @login_required
    def resolve_event(root, info, **kwargs):
        print("heeeellloo ", info.context.user)
        return root.event

    class Meta:
        form_class = EventCreationForm


### main mutation
class Mutation(graphene.ObjectType):
    add_event =  EventsMutation.Field()
