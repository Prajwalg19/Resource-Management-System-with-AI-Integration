# Generated by Django 4.2.5 on 2023-10-12 07:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("lab", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="experiment",
            name="experiment_name",
            field=models.CharField(
                max_length=30, primary_key=True, serialize=False, unique=True
            ),
        ),
    ]