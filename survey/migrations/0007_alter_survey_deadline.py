# Generated by Django 4.1.3 on 2022-11-16 01:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('survey', '0006_rename_ingeranswer_integeranswer_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='survey',
            name='deadline',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 29, 21, 58, 26, 467137)),
        ),
    ]