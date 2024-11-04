from django.urls import path

from main.views import (HomeView, LoginUserView, RegistrationUserView, ResetUserPasswordView, ResetPasswordUserDoneView,
                        ResetPasswordUserConfirmView, ResetPasswordUserCompleteView)

app_name = 'main'
urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('register/', RegistrationUserView.as_view(), name='register'),
    path('password_reset/', ResetUserPasswordView.as_view(), name='password_reset'),
    path('password_reset/done/', ResetPasswordUserDoneView.as_view(), name='password_reset_done'),
    path('password_reset/<uidb64>/<token>/', ResetPasswordUserConfirmView.as_view(), name='password_reset_confirm'),
    path('password_reset/complete/', ResetPasswordUserCompleteView.as_view(), name='password_reset_complete'),
]
