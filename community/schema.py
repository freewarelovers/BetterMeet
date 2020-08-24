from graphene_django import DjangoObjectType

from community.models import Community,CommunityOwner

class CommunityType(DjangoObjectType):
    class Meta :
        model = Community
        fields = '__all__'


class CommunityOwnerType(DjangoObjectType):
    class Meta :
        model = CommunityOwner
        fields = '__all__'
        