import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppointmentsDetailsComponent } from './components/appointments-details/appointments-details.component';
import { AddAppointmentsComponent } from './components/add-appointments/add-appointments.component';
//
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';


import { PrescriptionsListComponent } from './components/prescriptions-list/prescriptions-list.component';
// import { PrescriptionsDetailsComponent } from './components/prescriptions-details/prescriptions-details.component';
// import { AddPrescriptionsComponent } from './components/add-prescriptions/add-prescriptions.component';


import { PatientAppointmentsListComponent } from './components/patient-appointments-list/appointments-list.component';
import { DoctorsDetailsComponent } from './components/doctors-details/doctors-details.component';

//AUTH
import { UserLoginComponent } from "./components/user-login/user-login.component";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from "./components/user-login/auth.guard";
import { MedicalHistoryComponent } from './components/medical-history/medical-history.component';
import { DoctorAppointmentsListComponent } from './components/doctor-appointments-list/appointments-list.component';

const routes: Routes = [
  // { path: '', redirectTo: 'Clients', pathMatch: 'full' },
  { path: '', component: UserProfileComponent, pathMatch: 'full', canActivate: [AuthGuard] },

  { path: 'Patient-Appointments', component: PatientAppointmentsListComponent,canActivate: [AuthGuard] },
  { path: 'Appointments/:id', component: AppointmentsDetailsComponent, canActivate: [AuthGuard] },
  { path: 'Add-Appointment', component: AddAppointmentsComponent, canActivate: [AuthGuard] },
  { path: 'Doctor-Appointments', component: DoctorAppointmentsListComponent,canActivate: [AuthGuard] },
  { path: 'Patient-Prescriptions', component: PrescriptionsListComponent ,canActivate: [AuthGuard] },
// { path: 'Prescriptions/:id', component: PrescriptionsDetailsComponent, canActivate: [AuthGuard] },
  // {path: 'Prescriptions/:id', component: AppointmentssListComponent  },
// { path: 'Add-Prescription', component: AddPrescriptionsComponent, canActivate: [AuthGuard] },
  //Doctors
  // { path: 'Doctors', component: DoctorsListComponent, canActivate: [AuthGuard] },
  { path: 'Doctors/:id', component: DoctorsDetailsComponent,  },

  //Login
  { path: 'login', component: UserLoginComponent },
  { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  {path: 'MedicalHistory', component: MedicalHistoryComponent },
  {path: 'EditProfile', component: EditProfileComponent },
  //Other Redirect
  // { path: '**', redirectTo: '' },

];
export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
