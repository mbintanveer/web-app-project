# Generated by Django 3.2.16 on 2022-12-08 03:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserSystem', '0003_auto_20221208_0749'),
    ]

    operations = [
        migrations.AlterField(
            model_name='doctor',
            name='address',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='doctor',
            name='age',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='doctor',
            name='gender',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='doctor',
            name='phone',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='address',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='patient',
            name='age',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='gender',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='patient',
            name='phone',
            field=models.IntegerField(blank=True),
        ),
    ]
