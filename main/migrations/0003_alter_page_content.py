# Generated by Django 5.1.2 on 2024-11-05 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_alter_page_images'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='content',
            field=models.FileField(upload_to='markdown/', verbose_name='Контент'),
        ),
    ]
