import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { UserCredentials } from "./auth";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  logInForm;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
   this.logInForm = this.formBuilder.group({
     username: ['', Validators.required],
     password: ['', Validators.required]
   });
  }

  ngOnInit(): void {
  }

  logInUser(user: UserCredentials): void {
   this.authService.logIn(user.username, user.password).subscribe({
     next: (data) => {
       this.authService.setLoggedInUser(data);
       if (data.is_pharmacy) {
         this.router.navigateByUrl('/Pharmacy-Prescriptions');
        } else if (data.is_doctor) {
          this.router.navigateByUrl('/Doctor-Appointments');
        } else if (data.is_patient) {
          this.router.navigateByUrl('/Patient-Appointments');
        } else {
          // Handle other cases or provide a default route
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onSubmit(formData: UserCredentials): void {
    if (this.logInForm.invalid) {
      console.log(this.logInForm.errors);
    } else {
      this.logInUser(formData);
      
    }
  }
}