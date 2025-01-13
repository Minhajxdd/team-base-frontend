import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserComponentService {
  constructor(private http: HttpClient) {}

  getUser(keyword: string = ''): Observable<User[]> {
    return this.http.get<User[]>(`${environment.back_end}/users`, {
      withCredentials: true,
    });
  }
}
