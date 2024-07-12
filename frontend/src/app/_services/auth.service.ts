import { AUTH_API } from '../../config';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      httpOptions
    );
  }

  register(): Observable<any> {
    return this.http.post(
      AUTH_API + 'regiser',
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      AUTH_API + 'logout',
      httpOptions
    );
  }
}