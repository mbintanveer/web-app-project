import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 

  constructor(private router: Router) { }

  onNavigate(event: Event) {
    const route = (event.target as HTMLSelectElement).value;
    if (route) {
      this.router.navigate([route]);
    }
  }

  // ngOnInit(): void {
  // }

}

