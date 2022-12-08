import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { AppointmentsDetailsComponent } from './components/appointments-details/appointments-details.component';
import { AddAppointmentsComponent } from './components/add-appointments/add-appointments.component';

import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { DoctorsDetailsComponent } from './components/doctors-details/doctors-details.component';

//AUTH
import { UserLoginComponent } from "./components/user-login/user-login.component";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from "./components/user-login/auth.guard";

const routes: Routes = [
  // { path: '', redirectTo: 'Clients', pathMatch: 'full' },
  { path: '', component: UserLoginComponent, pathMatch: 'full' },

  { path: 'Appointments', component: AppointmentsListComponent },
  { path: 'Appointments/:id', component: AppointmentsDetailsComponent },
  { path: 'Add-Appointment', component: AddAppointmentsComponent },

  //Doctors
  { path: 'Doctors', component: DoctorsListComponent },
  { path: 'Doctors/:id', component: DoctorsDetailsComponent },

  //Login
  { path: 'login', component: UserLoginComponent },
  { path: 'user-profile/:id', component: UserProfileComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
