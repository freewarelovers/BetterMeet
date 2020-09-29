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
    def resolve_community(root, info, **kwargs):
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
    

  


### main query
class Query(graphene.ObjectType):
    all_communitys = graphene.List(CommunityType)
    get_communitys_by_id = graphene.List(CommunityType, id=graphene.Int())
    get_communitys_by_slug = graphene.Field(CommunityOwnerType, slug=graphene.String())
    all_communitys_owners = graphene.List(CommunityOwnerType)
    get_current_community_owner = graphene.Field(CommunityOwnerType, slug=graphene.String())
    get_current_user_communitys = graphene.List(CommunityOwnerType)
    @login_required
    def resolve_all_communitys(root, info):
        return Community.objects.all()
    
    #@login_required
    def resolve_all_communitys_owners(root, info):
        return CommunityOwner.objects.all()
    
    @login_required
    def resolve_get_current_user_communitys(root, info):
        print(info.context.user.first_name)
        print("current user", CommunityOwner.objects.filter(owner=info.context.user))
        return CommunityOwner.objects.filter(owner__email=info.context.user)
    @login_required
    def resolve_get_current_community_owner_for_community(root, info, slug):
        print(info.context.user)
        return CommunityOwner.objects.filter(community__slug=slug)

    @login_required
    def resolve_get_communitys_by_id(root, info, id):
        return Community.objects.filter(id=id)
    
    @login_required
    def resolve_get_communitys_by_slug(root, info, slug):
        return CommunityOwner.objects.get(community__slug=slug)