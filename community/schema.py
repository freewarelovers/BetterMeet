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


class Query(graphene.ObjectType):
    all_communitys = graphene.List(CommunityType)
    all_communitysOwners = graphene.List(CommunityOwnerType)