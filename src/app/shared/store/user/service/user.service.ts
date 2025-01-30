import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get(`${environment.back_end}/user-profile`, {
      withCredentials: true,
    });
  }

  // updateProfile(profile: string): Observable<any> {
  //   return this.http.put('/api/user/profile', { profile });
  // }
}
