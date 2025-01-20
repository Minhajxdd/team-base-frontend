import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProfileCardService {
  constructor(private http: HttpClient) {}

  DeleteUser(projectId: string, userId: string) {
    return this.http.delete(
      `${environment.back_end}/project/${projectId}/members?userId=${userId}`,
      { withCredentials: true }
    );
  }
}
