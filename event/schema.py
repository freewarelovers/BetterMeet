from graphene_django import DjangoObjectType
from .models import Event
from .forms import EventCreationForm
import graphene
from graphql_jwt.decorators import login_required
from graphene_django.forms.mutation import DjangoModelFormMutation


class EventType(DjangoObjectType):
    class Meta:
        model = Event
        fields = ['id','name', 'slug', 'event_creator', 'description', 'position', 'start_at']


class Query(graphene.ObjectType):
    all_events = graphene.List(EventType)
    get_community_events_by_slug = graphene.List(EventType, slug=graphene.String())
    def resolve_all_events(root, info):
        return Event.objects.all()
    def resolve_get_community_events_by_slug(root, info , slug):
        return Event.objects.filter(event_creator__community__slug=slug)


class EventsMutation(DjangoModelFormMutation):
    event =  graphene.Field(EventType)

    @login_required
    def resolve_event(root, info, **kwargs):
        return root.event

    class Meta:
        form_class = EventCreationForm


### main mutation
class Mutation(graphene.ObjectType):
    add_event =  EventsMutation.Field()
