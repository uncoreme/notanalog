from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    nickname = models.CharField(max_length=50, verbose_name='Никнейм')
    photo = models.ImageField(upload_to='profile_photos/', verbose_name='Фото')
    date_created = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    def __str__(self):
        return self.nickname

    class Meta:
        verbose_name = 'профиль'
        verbose_name_plural = 'Профили'
        ordering = ['-date_created']


class Page(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    previous = models.ForeignKey('Page', on_delete=models.CASCADE, null=True, blank=True,
                                 verbose_name='Предыдущая страница')
    icon = models.ImageField(upload_to='icons/', null=True, blank=True, verbose_name='Иконка')
    title = models.CharField(max_length=50, verbose_name='Название')
    is_public = models.BooleanField(default=False, verbose_name='Опубликована')
    content = models.JSONField(default=dict, null=True, blank=True, verbose_name='Контент')
    images = models.ManyToManyField('PageImage', blank=True, verbose_name='Изображения')
    date_created = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    views = models.PositiveIntegerField(default=0, verbose_name='Количество просмотров')

    def __str__(self):
        return f'{self.user}: {self.title}'

    class Meta:
        verbose_name = 'страница'
        verbose_name_plural = 'Страницы'
        ordering = ['-date_created']


class PageImage(models.Model):
    image = models.ImageField(upload_to='page_images/', verbose_name='Изображение')
    date_uploaded = models.DateTimeField(auto_now_add=True, verbose_name='Дата публикации')

    def __str__(self):
        return self.image.name

    class Meta:
        verbose_name = 'изображение страницы'
        verbose_name_plural = 'Изображения страниц'
        ordering = ['-date_uploaded']
