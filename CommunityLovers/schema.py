import graphene

from event.models import *

from base.schema import MembersType,CustomUser

class Query(graphene.ObjectType):
    all_members = graphene.List(MembersType)

    def resolve_all_members(root, info):
        return CustomUser.objects.all()


schema = graphene.Schema(query=Query)