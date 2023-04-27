import { Component, OnInit } from '@angular/core';
import { UserProfileService } from "../user-profile/user-profile.service";
import { UserProfile } from "../user-profile/user-profile";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isDoctor: boolean;
  isPatient: boolean;
  isPharmacy: boolean;
  
  constructor() { 
    this.isDoctor = false;
    this.isPatient = false;
    this.isPharmacy=true;
  }
  ngOnInit() {
    const userRoles = JSON.parse(localStorage.getItem('userData') ?? '[]');
    
    
    if (typeof userRoles === 'object' && userRoles !== null) {
      this.isDoctor = userRoles.is_doctor;
      this.isPatient = userRoles.is_patient;
      this.isPharmacy = true;//userRoles.is_patient;
    } else {
      console.error('User roles is not an object.');
    }
    
  }




}
