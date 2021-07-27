import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/Login';
import { LoginResponse } from '../interfaces/LoginResponse';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  login(values: Login): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      'http://localhost:3000/login',
      values
    );
  }

  logout() {
    document.cookie =
      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.router.navigate(['/login']);
  }

  setCookie(res: LoginResponse) {
    let { accessToken, expiresAt, timeUnit } = res;
    if (timeUnit !== 'second') throw 'invalid timeUnit in response';
    expiresAt = moment().add(expiresAt, 'second').utc().toString();
    document.cookie = `accessToken=${accessToken}; expires=${expiresAt};`;
  }
}
