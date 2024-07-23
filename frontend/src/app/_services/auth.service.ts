import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTH_API } from '../../config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(form: any): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      form,
      httpOptions
    );
  }

  register(form: any): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      form,
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      AUTH_API + 'logout',
      {},
      httpOptions
    );
  }
}
