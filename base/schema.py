from graphene_django import DjangoObjectType
from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene_django import DjangoListField
from graphql_jwt.decorators import login_required
from .models import *
from .forms import MemberCreationForm
import   graphene 
##################################
################################## OBJECTS TYPES
class MembersType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'

class TagType(DjangoObjectType):
    class Meta:
        model  = Tag
        fields  = '__all__'


########################################
########################################
######################################## Forms Mutations
class MembersMutation(DjangoModelFormMutation):
    member =  graphene.Field(MembersType)
    class Meta:
        form_class = MemberCreationForm


### main mutation
class Mutation(graphene.ObjectType):
    add_member = MembersMutation.Field()


### main query
class Query(graphene.ObjectType):
    all_members = graphene.List(MembersType)
    get_current_member = graphene.Field(MembersType)
    def resolve_all_members(root, info):
        return CustomUser.objects.all()

    @login_required
    def resolve_get_current_member(root, info):
        print(info.context.user)
        return CustomUser.objects.get(pk=3)