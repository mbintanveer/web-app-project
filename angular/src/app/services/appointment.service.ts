import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';

const baseUrl = 'http://localhost:8000/api/Appointments';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(baseUrl);
  }

  get(id: any): Observable<Appointment> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${baseUrl}?title=${title}`);
  }

  findByClient(appointment_client_id: any): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${baseUrl}?appointment_client_id=${appointment_client_id}`);
  }

}

