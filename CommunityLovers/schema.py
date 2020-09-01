import graphene

from event.models import *

from base.schema import MembersType,CustomUser
from community.schema import Community, CommunityOwner, CommunityOwnerType,CommunityType
from event.schema import Event,EventType

class Query(graphene.ObjectType):
    all_members = graphene.List(MembersType)
    all_communitys = graphene.List(CommunityType)
    all_communitysOwners = graphene.List(CommunityOwnerType)
    all_events = graphene.List(EventType)

    def resolve_all_members(root, info):
        return CustomUser.objects.all()


schema = graphene.Schema(query=Query)