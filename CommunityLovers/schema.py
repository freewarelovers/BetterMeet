import graphene
import graphql_jwt
from graphql_auth import mutations

from base.schema import Query as UserQuery,Mutation as UserMutation
from community.schema import Query as CommunityQuery
from event.schema import Query as EventQuery




class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    verify_account = mutations.VerifyAccount.Field()
    token_auth = mutations.ObtainJSONWebToken.Field()
    update_account = mutations.UpdateAccount.Field()

class Query(UserQuery,CommunityQuery, EventQuery,graphene.ObjectType):
   pass
class Mutation(AuthMutation,UserMutation,graphene.ObjectType):
    pass
schema = graphene.Schema(query=Query, mutation=Mutation)