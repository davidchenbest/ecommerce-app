import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/Login';
import { LoginResponse } from '../interfaces/LoginResponse';
import { User } from '../interfaces/User';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(values: Login): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      'http://localhost:3000/login',
      values
    );
  }

  setCookie(res: LoginResponse) {
    let { accessToken, expiresAt, timeUnit } = res;
    if (timeUnit !== 'second') throw 'invalid timeUnit in response';
    expiresAt = moment().add(expiresAt, 'second').utc().toString();
    document.cookie = `accessToken=${accessToken}; expires=${expiresAt};`;
  }
}
