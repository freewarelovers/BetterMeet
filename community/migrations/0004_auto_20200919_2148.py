# Generated by Django 3.1 on 2020-09-19 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0003_auto_20200823_2259'),
    ]

    operations = [
        migrations.AlterField(
            model_name='community',
            name='slug',
            field=models.SlugField(blank=True, null=True, verbose_name='community slug'),
        ),
    ]
