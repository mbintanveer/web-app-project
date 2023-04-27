import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 

  constructor(private http: HttpClient,private router: Router) { }

  onNavigate(event: any) {
    const url = event.target.value;
    if (url === '/logout') {
      this.logout();
    } else {
      this.router.navigate([url]);
    }
  }

  onOptionSelected(event: any) {
    const selectedOption = event.target.value;
    if (selectedOption === '/Logout') {
      this.logout();
      console.log(selectedOption);
    } else if (selectedOption === '/MedicalHistory') {
      this.router.navigate(['/MedicalHistory']);
    }
  }
  

  // ngOnInit(): void {
  // }

  logout() {
    this.http.post('http://localhost:8000/api/logout/', {}).subscribe(response => {
      // Handle successful logout, e.g. clear local storage, redirect to login page.
      localStorage.clear();
      this.router.navigate(['/login']);
    }, error => {
      // Handle error case, e.g. show error message.
      console.error(error);
    });
  }

}

