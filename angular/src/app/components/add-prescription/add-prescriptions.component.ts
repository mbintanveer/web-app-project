import { Component, OnInit } from '@angular/core';
import { Prescription } from 'src/app/models/prescription.model';
import { PrescriptionService } from 'src/app/services/patient-prescription.service';

import { ActivatedRoute } from "@angular/router";

import { Appointment} from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/doctor-appointment.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescriptions.component.html',
  styleUrls: ['./add-prescriptions.component.css']
})

export class AddPrescriptionsComponent implements OnInit {
  prescription: Prescription = {
    patient:'',
    description:''
  };
  submitted = false;
  appointments?: Appointment[];

  constructor (private prescriptionService: PrescriptionService,
    private clientService: AppointmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute){

     }

  ngOnInit(): void {
    this.retrievePrescriptions();
  }

  retrievePrescriptions(): void {
    const userData = JSON.parse(localStorage.getItem('userData')|| '{}')

    this.clientService.getAll(userData.user_id)
      .subscribe(
        data => {
          this.appointments = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  savePrescription(): void {
    
    // const userData = ;
 
    const userData = JSON.parse(localStorage.getItem('userData')|| '{}')
 
    const data = {
      
      description: this.prescription.description,
      appointment_id: this.prescription.appointment_id,
      patient: ""+userData.user_id
      // patient: 3
    };
    
    this.prescriptionService.create(data)
      .subscribe(
        response => {
          console.log(response);
          // this.router.navigate(['/View-Appointments/'+this.prescription.patient]);
        },
        error => {
          console.log(error);
        });
  }

  newPrescription(): void {
    this.submitted = false;
    this.prescription = {
      
    };
     
  }
}