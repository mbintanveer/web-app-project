# Generated by Django 3.2.16 on 2022-12-08 04:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserSystem', '0004_auto_20221208_0847'),
    ]

    operations = [
        migrations.AlterField(
            model_name='doctor',
            name='age',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='doctor',
            name='phone',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='age',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='phone',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
