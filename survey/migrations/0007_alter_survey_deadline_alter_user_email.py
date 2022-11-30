# Generated by Django 4.1.3 on 2022-11-29 13:08

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('survey', '0006_alter_survey_deadline'),
    ]

    operations = [
        migrations.AlterField(
            model_name='survey',
            name='deadline',
            field=models.DateTimeField(default=datetime.datetime(2022, 12, 13, 9, 8, 44, 830089)),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]