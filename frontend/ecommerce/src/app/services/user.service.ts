import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  register(obj: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:3000/register', obj, {
      withCredentials: true,
    });
  }

  profile(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/profile', {
      withCredentials: true,
    });
  }
}
