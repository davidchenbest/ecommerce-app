import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:3000/users', {
      withCredentials: true,
    });
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`http://localhost:3000/user/${id}`, {
      withCredentials: true,
    });
  }

  registerAdmin(user: any): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:3000/registerAdmin',
      user,
      {
        withCredentials: true,
      }
    );
  }

  editUser(user: any): Observable<any> {
    return this.httpClient.put<any>(
      `http://localhost:3000/editUser/${user._id}`,
      user,
      {
        withCredentials: true,
      }
    );
  }
  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete<any>(
      `http://localhost:3000/deleteUser/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
