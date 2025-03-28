import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.js';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserComponentService {
  constructor(private http: HttpClient) {}

  getUser(
    keyword: string = '',
    limit?: number,
    skip?: number
  ): Observable<User[]> {
    let url = `${environment.back_end}/users?query=${keyword}&limit=${limit}&skip=${skip}`;
    return this.http.get<User[]>(url, {
      withCredentials: true,
    });
  }
}
