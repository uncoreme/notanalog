from rest_framework import viewsets

from main.models import Page
from main.serializers import PageSerializer


class PageAPIView(viewsets.ModelViewSet):
    serializer_class = PageSerializer
    http_method_names = ['get', 'put']

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Page.objects.filter(user=self.request.user)
