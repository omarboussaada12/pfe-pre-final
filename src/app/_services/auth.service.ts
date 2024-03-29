import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//const AUTH_API = 'http://localhost:8080/api/auth/';
const AUTH_API = 'https://broken-birth-production.up.railway.app/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, firstname: string, lastname: string, phone: string, address: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {username, firstname, lastname, phone, address, email, password, role }, httpOptions);
  }
}
