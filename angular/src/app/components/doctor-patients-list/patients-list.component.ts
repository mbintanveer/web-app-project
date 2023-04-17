import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/doctor-patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})


export class DoctorPatientsListComponent implements OnInit {

  patients?: any;
  patient_type = '';
  currentPatient: Patient = {};
  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  tableSize = 10;

  constructor(private patientService: PatientService) { 
}

  ngOnInit(): void {
    this.retrievePatients();

    
  }

  
  retrievePatients(): void {
    const userData = JSON.parse(localStorage.getItem('userData')|| '{}')
    console.log(userData.user_id);
    this.patientService.getAll(userData.user_id)
    
      .subscribe(
        data => {
          this.patients = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  
  refreshList(): void {
    this.retrievePatients();
    this.currentPatient = {};
    this.currentIndex = -1;
  }
    
  tabSize(event:any){
    this.page = event;
    //this.retrieveClients();
  }  

  tableData(event:any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.retrievePatients();
  } 

  setActiveAppointment(appointment: Patient, index: number): void {
    this.currentPatient =appointment;
    this.currentIndex = index;
  }

  searchAppointments(): void {
    this.currentPatient = {};
    this.currentIndex = -1;

    this.patientService.findByAppointmentType(this.patient_type)
      .subscribe(
        data => {
          this.patients = data;
          this.page=1
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}


