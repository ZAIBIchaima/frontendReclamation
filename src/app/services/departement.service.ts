import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Departement } from '../models/departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  private baseUrl = 'http://localhost:8080/api/departements';
  private baseUrl1 = '/api/saveUserServer';
  host: string = "http://localhost:8080";
  choixmenu: string = 'A';
  listData: Departement[] = [];
  public dataForm!: FormGroup;

  constructor(private http: HttpClient) { }

  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getAll(): Observable<any> {

    return this.http.get(`${this.baseUrl}`);
  }
  createData(formData: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, formData);
  }

  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteData(id: number): Observable<any> {

    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
