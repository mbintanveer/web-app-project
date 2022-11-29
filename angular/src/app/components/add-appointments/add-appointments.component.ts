import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

import { Doctor} from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointments.component.html',
  styleUrls: ['./add-appointments.component.css']
})

export class AddAppointmentsComponent implements OnInit {
  appointment: Appointment = {
    appointment_id: '',
    appointment_time: '2020-01-01',
    patient:'',
    doctor:'',
  };
  submitted = false;
  doctors?: Doctor[];

  constructor (private appointmentService: AppointmentService,
    private clientService: DoctorService,
    private router: Router){ }

  ngOnInit(): void {
    this.retrieveAppointments();
  }

  retrieveAppointments(): void {
    this.clientService.getAll()
      .subscribe(
        data => {
          this.doctors = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  saveAppointment(): void {
    const data = {
      appointment_id: this.appointment.appointment_id,
      appointment_time: this.appointment.appointment_time,
      doctor:this.appointment.doctor,
      patient:this.appointment.patient,
    };
    

    this.appointmentService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/View-Doctors/'+this.appointment.patient]);
        },
        error => {
          console.log(error);
        });
  }

  newAppointment(): void {
    this.submitted = false;
    this.appointment = {
      
    };
     
  }
}