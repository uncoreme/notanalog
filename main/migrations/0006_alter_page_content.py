# Generated by Django 5.1.2 on 2024-11-07 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_alter_page_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='content',
            field=models.JSONField(default=dict, verbose_name='Контент'),
        ),
    ]
