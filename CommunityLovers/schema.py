import graphene

from event.models import *

from base.schema import Query as UserQuery,Mutation as UserMutation
from community.schema import Query as CommunityQuery
from event.schema import Query as EventQuery

class Query(UserQuery,CommunityQuery, EventQuery,graphene.ObjectType):
   pass
class Mutation(UserMutation,graphene.ObjectType):
    pass
schema = graphene.Schema(query=Query, mutation=Mutation)