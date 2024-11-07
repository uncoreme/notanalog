from rest_framework import serializers

from main.models import Page, PageImage


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ['content']
