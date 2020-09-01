from graphene_django import DjangoObjectType
from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene_django import DjangoListField
from .models import *
from .forms import MemberCreationForm

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
    member = DjangoListField(MembersType)
    class Meta:
        form_class = MemberCreationForm