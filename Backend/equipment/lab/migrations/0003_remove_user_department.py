# Generated by Django 3.2.18 on 2023-09-30 11:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lab', '0002_user_department'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='department',
        ),
    ]