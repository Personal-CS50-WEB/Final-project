# Generated by Django 4.1.3 on 2022-11-28 16:21

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('survey', '0005_alter_survey_deadline'),
    ]

    operations = [
        migrations.AlterField(
            model_name='survey',
            name='deadline',
            field=models.DateTimeField(default=datetime.datetime(2022, 12, 12, 12, 21, 41, 732660)),
        ),
    ]
