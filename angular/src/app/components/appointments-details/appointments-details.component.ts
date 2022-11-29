import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Client} from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { Appointment } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointments-details.component.html',
  styleUrls: ['./appointments-details.component.css']
})

export class AppointmentsDetailsComponent implements OnInit {
  
  status : any = "4";
  currentAppointment: Appointment = {
    appointment_id: '',
    appointment_description: '',
    // appointment_amount: 0,
    appointment_client:'',
    date_created:''
    ,
    
  };
  message = '';
  clients?: Client[];
  constructor(
    private appointmentService: AppointmentService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
      this.message = '';
      this.retrieveClients();
      this.getAppointment(this.route.snapshot.params.id);
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

    getAppointment(id: string): void {
      this.appointmentService.get(id)
        .subscribe(
          data => {
            this.currentAppointment = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }
  
    updatePublished(status: boolean): void {
      const data = {
        appointment_id: this.currentAppointment.appointment_id,
        appointment_description: this.currentAppointment.appointment_description,
        // appointment_amount: 0,
        date_created:'',
        appointment_client:'',
      };
  
      this.message = '';
  
      this.appointmentService.update(this.currentAppointment.appointment_id, data)
        .subscribe(
          response => {
            console.log(response);
            this.message = response.message ? response.message : 'The status was updated successfully!';
          },
          error => {
            console.log(error);
          });
    }
  
    updateAppointment(): void {
  
      this.appointmentService.update(this.currentAppointment.appointment_id, this.currentAppointment)
        .subscribe(
            
          error => {
            console.log(error);
          });
        this.router.navigate(['/View-Clients/'+this.currentAppointment.appointment_client]);
          
    }
  
    deleteAppointment(): void {
      this.appointmentService.delete(this.currentAppointment.appointment_id)
        .subscribe(
          response => {
       
            this.message = response.message ? response.message : 'This appointment was deleted successfully!';
            this.router.navigate(['/View-Clients/'+this.currentAppointment.appointment_client]);
          },
          error => {
            console.log(error);
          });
    }
  }

