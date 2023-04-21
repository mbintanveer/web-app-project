import { NgModule } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { HTTP_INTERCEPTORS} from "@angular/common/http";
import { TokenInterceptor } from "./components/user-login/token.interceptor";

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { AddAppointmentsComponent } from './components/add-appointments/add-appointments.component';
import { AppointmentsDetailsComponent } from './components/appointments-details/appointments-details.component';
import { PatientAppointmentsListComponent } from './components/patient-appointments-list/appointments-list.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MatCardModule } from '@angular/material/card';
import { PrescriptionsListComponent } from './components/patient-prescriptions-list/prescriptions-list.component';
import { DoctorAppointmentsListComponent } from './components/doctor-appointments-list/appointments-list.component';
import { DoctorPrescriptionsListComponent } from './components/doctor-prescriptions-list/prescriptions-list.component';
import { DoctorPatientsListComponent } from './components/doctor-patients-list/patients-list.component';
import { DoctorSignupComponent } from './components/doctor-signup/doctor-signup.component';
import { PatientSignupComponent } from './components/patient-signup/patient-signup.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DoctorsListComponent,
    AddAppointmentsComponent,
    AppointmentsDetailsComponent,
    PatientAppointmentsListComponent,
    DoctorAppointmentsListComponent,
    DoctorPrescriptionsListComponent,
    UserLoginComponent,
    UserProfileComponent,
    DoctorPatientsListComponent,
    DoctorSignupComponent,
    PatientSignupComponent,
    PrescriptionsListComponent,
  ],

  exports: [
    NavbarComponent,
    NgxPaginationModule ,
  ],

  imports: [
    AppRoutingModule,
    RouterModule,
    NgxPaginationModule,
    MatToolbarModule, 
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatListModule ,
    MatStepperModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },],
  bootstrap: [AppComponent]
})

export class AppModule { }
