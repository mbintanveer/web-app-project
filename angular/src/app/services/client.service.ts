import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

const baseUrl = 'http://localhost:8000/api/Clients';
const summaryUrl = 'http://localhost:8000/api/Clients_Summary'
const all_summary_Url='http://localhost:8000/api/All_Clients_Summary'

@Injectable({
  providedIn: 'root'
})

export class ClientService {
  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  // getAll(): Observable<any> {
  //   return this.http.get<Client[]>(baseUrl);
  // }

  get(id: any): Observable<Client> {
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

  findByClientName(client_name: any): Observable<Client[]> {
    return this.http.get<Client[]>(`${baseUrl}?client_name_keyword=${client_name}`);
  }

  get_Client_Summary(id: any): Observable<Client> {
    return this.http.get(`${summaryUrl}/${id}`);
  }

  get_all_client_summaries(): Observable<any> {
    return this.http.get(all_summary_Url);
  }

}

