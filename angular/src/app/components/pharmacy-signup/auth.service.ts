import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signupUrl = 'http://127.0.0.1:8000/api/signup/pharmacy/';

  constructor(private http: HttpClient) { }

  signup(signupData: any): Observable<any> {
    return this.http.post<any>(this.signupUrl, signupData);
  }
}
