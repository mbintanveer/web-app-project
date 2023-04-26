import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/patient-appointment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute } from "@angular/router";

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
    patient:'',
    doctor:'',
    description:''
  };
  submitted = false;
  doctors?: Doctor[];

  constructor (private appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
    private clientService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute){

      
     }

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
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const data = {
      description: this.appointment.description,
      doctor: this.appointment.doctor,
      patient: ""+userData.user_id,
      appointment_time: this.appointment.appointment_time
    };
    
    this.appointmentService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/View-Doctors/'+this.appointment.patient]);
          this.snackBar.open('Appointment booked successfully', 'Close', { duration: 3000 });
        },
        error => {
          console.log(error);
          this.snackBar.open('Error - There is already a Booking 30 minutes before and after. Please try another time.', 'Close', { duration: 8000 });
        }
      );
  }

  newAppointment(): void {
    this.submitted = false;
    this.appointment = {
      
    };
     
  }
}