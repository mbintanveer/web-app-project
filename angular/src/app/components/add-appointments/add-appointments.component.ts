import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

import { Client} from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointments.component.html',
  styleUrls: ['./add-appointments.component.css']
})

export class AddAppointmentsComponent implements OnInit {
  appointment: Appointment = {
    appointment_id: '',
    appointment_description: '',
    appointment_amount: 0,
    date_created: '2020-01-01',
  };
  submitted = false;
  clients?: Client[];

  constructor (private appointmentService: AppointmentService,
    private clientService: ClientService,
    private router: Router){ }

  ngOnInit(): void {
    this.retrieveClients();
  }

  retrieveClients(): void {
    this.clientService.getAll()
      .subscribe(
        data => {
          this.clients = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  saveAppointment(): void {
    const data = {
      appointment_id: this.appointment.appointment_id,
      appointment_description: this.appointment.appointment_description,
      appointment_amount:this.appointment.appointment_amount,
      date_created: this.appointment.date_created,
      appointment_client:this.appointment.appointment_client,
    };
    

    this.appointmentService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/View-Clients/'+this.appointment.appointment_client]);
        },
        error => {
          console.log(error);
        });
  }

  newAppointment(): void {
    this.submitted = false;
    this.appointment = {
      appointment_description: '',
      
    };
     
  }
}