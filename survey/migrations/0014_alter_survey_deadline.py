# Generated by Django 4.1.3 on 2022-11-18 15:13

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('survey', '0013_alter_survey_deadline'),
    ]

    operations = [
        migrations.AlterField(
            model_name='survey',
            name='deadline',
            field=models.DateTimeField(default=datetime.datetime(2022, 12, 2, 11, 13, 2, 985582)),
        ),
    ]
