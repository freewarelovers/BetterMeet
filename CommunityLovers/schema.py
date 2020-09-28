import graphene
import graphql_jwt
from graphql_auth import mutations
from graphql_auth.schema import UserQuery as  UserQuery_, MeQuery
from base.schema import Query as UserQuery,Mutation as UserMutation
from community.schema import Query as CommunityQuery , Mutation as CommunityMutation
from event.schema import Query as EventQuery, Mutation as EventMutation




class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    verify_account = mutations.VerifyAccount.Field()
    token_auth = mutations.ObtainJSONWebToken.Field()
    verify_token = mutations.VerifyToken.Field()
    update_account = mutations.UpdateAccount.Field()

class Query(UserQuery,CommunityQuery,  UserQuery_, MeQuery, EventQuery, graphene.ObjectType):
   pass
class Mutation(AuthMutation,UserMutation,CommunityMutation,EventMutation,graphene.ObjectType):
    pass
schema = graphene.Schema(query=Query, mutation=Mutation)