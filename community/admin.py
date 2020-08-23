from django.contrib import admin
from .models import Community, CommunityOwner
# Register your models here.
# Register your models here.
@admin.register(Community)
class EventAdmin(admin.ModelAdmin):
    model =Community
    fieldsets  = [
        ("General info", {'fields': ['name']}),
        ]

@admin.register(CommunityOwner)
class EventAdmin(admin.ModelAdmin):
    model =CommunityOwner
    fieldsets  = [
        ("General info", {'fields': ['owner', "community"]}),
        ]