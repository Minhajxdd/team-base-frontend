import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  constructor(private http: HttpClient) {}

  updateUserBlockStatus(userId: string) {
    return this.http.post(
      `${environment.back_end}/admin/block`,
      { userId },
      { withCredentials: true }
    );
  }
}
