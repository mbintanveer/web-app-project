# Generated by Django 3.2.16 on 2022-12-23 22:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('UserSystem', '0005_auto_20221208_0934'),
        ('AppointmentBooking', '0009_auto_20221224_0306'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='doctor',
            field=models.ForeignKey(default=3, on_delete=django.db.models.deletion.CASCADE, related_name='appointment_doctor', to='UserSystem.doctor'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='appointment',
            name='patient',
            field=models.ForeignKey(default=3, on_delete=django.db.models.deletion.CASCADE, related_name='appointment_patient', to='UserSystem.patient'),
            preserve_default=False,
        ),
    ]
