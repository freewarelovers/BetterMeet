from django.contrib import admin
from .forms import MemberCreationForm
from .models import CustomUser, Tag
from django.contrib.auth.admin import UserAdmin
# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    add_form = MemberCreationForm
    form = MemberCreationForm
    model = CustomUser
    list_display = ('email', 'is_staff', 'is_active',)
    list_filter = ('email', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('first_name', 'last_name','email', 'password','profile_pic')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'profile_pic','password1', 'password2', 'is_staff', 'is_active',)}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    model =Tag
    fieldsets  = [
        ("General info", {'fields': ['name']}),
        ]