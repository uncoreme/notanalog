from main.models import Profile, Page


def profile(request):
    return {'profile': Profile.objects.get(user=request.user)}


def pages(request):
    return {'pages': Page.objects.filter(user=request.user)}
