import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../interfaces/Login';
import { LoginResponse } from '../interfaces/LoginResponse';
import * as moment from 'moment';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  access = new BehaviorSubject<string>('');
  accessValue: string = '';
  constructor(private httpClient: HttpClient, private router: Router) {
    this.access.subscribe((value) => (this.accessValue = value));
    const access = this.getCookie('role');
    this.access.next(access ? access : '');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    // special role auth
    if (route.data['role']) {
      if (this.accessValue === route.data['role']) return true;
    }
    // regular auth
    else if (this.accessValue) return true;
    this.router.navigate(['/login']);
  }

  login(login: Login) {
    this.httpClient
      .post<LoginResponse>('http://localhost:3000/login', login)
      .subscribe((res) => {
        this.setCookie(res);
        this.setAccess(res);
      });
  }

  logout() {
    const values = ['accessToken', 'role'];
    values.forEach(
      (value) =>
        (document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`)
    );
    this.access.next('');
    this.router.navigate(['/login']);
  }

  setAccess(res: LoginResponse) {
    const { role } = res;
    if (role) this.access.next(role);
    else this.access.next('regular');
  }

  setCookie(res: LoginResponse) {
    let { accessToken, expiresAt, timeUnit, role } = res;
    if (timeUnit !== 'second') throw 'invalid timeUnit in response';
    expiresAt = moment().add(expiresAt, 'second').utc().toString();
    document.cookie = `accessToken=${accessToken}; expires=${expiresAt};`;
    if (role) document.cookie = `role=${role}; expires=${expiresAt};`;
    else document.cookie = `role=regular; expires=${expiresAt};`;
  }

  getCookie(cookieName: string) {
    const arr = document.cookie.split(';');
    for (let a of arr) {
      const [key, value] = a.split('=');
      if (key.trim() === cookieName) return value;
    }
    return '';
  }
}
