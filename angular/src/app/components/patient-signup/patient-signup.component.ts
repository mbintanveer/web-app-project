import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-signup',
  templateUrl: './patient-signup.component.html',
  styleUrls: ['./patient-signup.component.css'],
})
export class PatientSignupComponent {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  
  

  onSubmit(formData: any): void {
    const signupData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      //
      username: formData.username,
      password2: formData.password2,
      address: formData.address,
      phone: formData.phone,
      age: formData.age,
      gender: formData.gender
    };
    
    this.authService.signup(signupData).subscribe({
      next: (data) => {
        this.snackBar.open('Signup successful!', 'Close', {
          duration: 3000
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 4000);
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open('Signup failed. Please try again.', 'Close', {
          duration: 3000
        });
      }
    });
  }
  

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const password2 = formGroup.get('password2');
    if (password == null || password2 == null) {
      return null;
    }
    return password.value === password2.value ? null : { passwordMismatch: true };
  }
  
}
