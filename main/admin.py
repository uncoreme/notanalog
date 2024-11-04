from django.contrib import admin

from main.models import Profile, Page, PageImage


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'nickname', 'photo', 'date_created')
    list_display_links = ('user',)


class PageAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'is_public', 'views', 'previous', 'date_created')
    list_display_links = ('title',)


class PageImageAdmin(admin.ModelAdmin):
    list_display = ('image', 'date_uploaded')
    list_display_links = ('image',)


admin.site.register(Profile, ProfileAdmin)
admin.site.register(Page, PageAdmin)
admin.site.register(PageImage, PageImageAdmin)
