import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

const baseUrl = 'http://localhost:8000/api/Patients';
const patientUrl = 'http://localhost:8000/api/PatientsByDoctor';

@Injectable({
  providedIn: 'root'
})

export class PatientService {
  constructor(private http: HttpClient) { }

  getAll(id: any): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${patientUrl}/${id}`);
  }

  get(id: any): Observable<Patient> {
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

  findByTitle(title: any): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${baseUrl}?title=${title}`);
  }

  findByAppointmentType(patient_type: any): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${baseUrl}?patient_type_keyword=${patient_type}`);
  }

}

