from graphene_django import DjangoObjectType
import graphene
from community.models import Community,CommunityOwner

class CommunityType(DjangoObjectType):
    class Meta :
        model = Community
        fields = '__all__'


class CommunityOwnerType(DjangoObjectType):
    class Meta :
        model = CommunityOwner
        fields = '__all__'

## mutations
class MembersMutation(DjangoModelFormMutation):
    member =  graphene.Field(CommunityType)
    class Meta:
        form_class = MemberCreationForm




### main mutation
class Mutation(graphene.ObjectType):
    add_member = MembersMutation.Field()

### main query
class Query(graphene.ObjectType):
    all_communitys = graphene.List(CommunityType)
    all_communitysOwners = graphene.List(CommunityOwnerType)