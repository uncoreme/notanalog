from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.contrib.auth.views import LoginView, PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, \
    PasswordResetCompleteView
from django.shortcuts import render
from django.contrib.auth.forms import AuthenticationForm, PasswordResetForm
from django.urls import reverse_lazy
from django.views.generic import TemplateView, CreateView, DetailView

from main.models import Profile, Page, PageImage
from main.forms import RegistrationForm


class HomeView(LoginRequiredMixin, TemplateView):
    template_name = 'main/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['pages'] = Page.objects.filter(user=self.request.user)
        return context


# --------- авторизация ---------
class LoginUserView(LoginView):
    form_class = AuthenticationForm
    model = User
    next_page = reverse_lazy('main:home')
    template_name = 'main/authorization/login.html'


class RegistrationUserView(CreateView):
    form_class = RegistrationForm
    model = User
    success_url = reverse_lazy('main:login')
    template_name = 'main/authorization/registration.html'


# --------- восстановление пароля ---------
class ResetUserPasswordView(PasswordResetView):
    form_class = PasswordResetForm
    success_url = reverse_lazy('main:password_reset_done')
    template_name = 'main/authorization/password_reset/password_reset_form.html'
    email_template_name = 'main/authorization/password_reset_email.html'


class ResetPasswordUserDoneView(PasswordResetDoneView):
    template_name = 'main/authorization/password_reset/password_reset_done.html'


class ResetPasswordUserConfirmView(PasswordResetConfirmView):
    template_name = 'main/authorization/password_reset/password_reset_confirm.html'
    success_url = reverse_lazy('main:password_reset_complete')


class ResetPasswordUserCompleteView(PasswordResetCompleteView):
    template_name = 'main/authorization/password_reset/password_reset_complete.html'
# --------- авторизация ---------


class PageDetailView(DetailView):
    model = Page
    context_object_name = 'page'
    template_name = 'main/page.html'
    pk_url_kwarg = 'pk'
