# Generated by Django 3.2.16 on 2022-12-23 22:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('UserSystem', '0005_auto_20221208_0934'),
        ('AppointmentBooking', '0007_auto_20221223_1817'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='description',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='doctor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointment_doctor', to='UserSystem.doctor'),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointment_patient', to='UserSystem.patient'),
        ),
    ]