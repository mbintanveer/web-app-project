import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SummaryComponent } from './components/summary/summary.component';

import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { AppointmentsDetailsComponent } from './components/appointments-details/appointments-details.component';
import { AddAppointmentsComponent } from './components/add-appointments/add-appointments.component';



const routes: Routes = [
  // { path: '', redirectTo: 'Clients', pathMatch: 'full' },
  { path: '', component: SummaryComponent, pathMatch: 'full' },

  { path: 'Appointments', component: AppointmentsListComponent },
  { path: 'Appointments/:id', component: AppointmentsDetailsComponent },
  { path: 'Add-Appointment', component: AddAppointmentsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }