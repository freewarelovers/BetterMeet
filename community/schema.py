from graphene_django import DjangoObjectType
import graphene
from graphene_django.forms.mutation import DjangoModelFormMutation

from community.models import Community,CommunityOwner
from .froms import CommunityCreationForm, CommunityOwnerCreationForm


class CommunityType(DjangoObjectType):
    class Meta :
        model = Community
        fields = '__all__'


class CommunityOwnerType(DjangoObjectType):
    class Meta :
        model = CommunityOwner
        fields = '__all__'

## mutations
class CommunitysMutation(DjangoModelFormMutation):
    community =  graphene.Field(CommunityType)
    class Meta:
        form_class = CommunityCreationForm

class CommunitysOwnersMutation(DjangoModelFormMutation):
    community_owner =  graphene.Field(CommunityOwnerType)
    class Meta:
        form_class = CommunityOwnerCreationForm


### main mutation
class Mutation(graphene.ObjectType):
    add_community = CommunitysMutation.Field()
    add_owner_to_community = CommunitysOwnersMutation.Field()


### main query
class Query(graphene.ObjectType):
    all_communitys = graphene.List(CommunityType)
    all_communitysOwners = graphene.List(CommunityOwnerType)