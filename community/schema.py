from graphene_django import DjangoObjectType
import graphene
from graphql_jwt.decorators import login_required
from graphene_django.forms.mutation import DjangoModelFormMutation

from community.models import Community,CommunityOwner
from .froms import CommunityCreationForm, CommunityOwnerCreationForm


class CommunityType(DjangoObjectType):
    class Meta :
        model = Community
        fields = ['id','name', 'slug', 'created_at']


class CommunityOwnerType(DjangoObjectType):
    class Meta :
        model = CommunityOwner
        fields = ['id','owner', 'community', 'created_at']


## mutations
class CommunitysMutation(DjangoModelFormMutation):
    community =  graphene.Field(CommunityType)

    @login_required
    def resolve_community( root, info, **kwargs):
        print("a context ",  info.context.user)
        print("this communty ",  root.community)
        return root.community
        

    class Meta:
        form_class = CommunityCreationForm

class CommunitysOwnersMutation(DjangoModelFormMutation):
    community_owner =  graphene.Field(CommunityOwnerType)

    @login_required
    def resolve_community_owner(root, info, **kwargs):
        return root.community_owner

    class Meta:
        form_class = CommunityOwnerCreationForm


### main mutation
class Mutation(graphene.ObjectType):
    add_community = CommunitysMutation.Field()
    add_owner_to_community = CommunitysOwnersMutation.Field()


    @login_required
    def resolve_add_owner_to_community(self, root, info, **kwargs):
        pass
  


### main query
class Query(graphene.ObjectType):
    all_communitys = graphene.List(CommunityType)
    get_communitys_by_id = graphene.List(CommunityType, id=graphene.Int())
    all_communitysOwners = graphene.List(CommunityOwnerType)

    def resolve_get_communitys_by_id(root, info, id):
        return Community.objects.filter(id=id)
    