from main.models import Profile, Page


def profile(request):
    user_profile = Profile.objects.filter(user=request.user)
    if user_profile.exists():
        return {'profile': user_profile.first()}
    return {}


def pages(request):
    user_pages = Page.objects.filter(user=request.user)
    if user_pages.exists():
        return {'pages': user_pages}
    return {}
