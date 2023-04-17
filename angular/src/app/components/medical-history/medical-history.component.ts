import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/patient-appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})


export class MedicalHistoryComponent implements OnInit {

  appointments?: any;
  appointment_type = '';
  currentAppointment: Appointment = {};
  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  tableSize = 10;

  constructor(private appointmentService: AppointmentService) { 
}

  ngOnInit(): void {
    this.retrieveAppointments();

    
  }

  
  retrieveAppointments(): void {
    const userData = JSON.parse(localStorage.getItem('userData')|| '{}')
    console.log(userData.user_id);
    this.appointmentService.getAll(userData.user_id)
    
      .subscribe(
        data => {
          this.appointments = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  
  refreshList(): void {
    this.retrieveAppointments();
    this.currentAppointment = {};
    this.currentIndex = -1;
  }
    
  tabSize(event:any){
    this.page = event;
    //this.retrieveClients();
  }  

  tableData(event:any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.retrieveAppointments();
  } 

  setActiveAppointment(appointment: Appointment, index: number): void {
    this.currentAppointment =appointment;
    this.currentIndex = index;
  }

  searchAppointments(): void {
    this.currentAppointment = {};
    this.currentIndex = -1;

    this.appointmentService.findByAppointmentType(this.appointment_type)
      .subscribe(
        data => {
          this.appointments = data;
          this.page=1
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}

