import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../../environments/environment.js';

@Injectable({
  providedIn: 'root',
})
export class RoleChangeFormService {
  constructor(private readonly http: HttpClient) {}

  changeRole(projectId: string, userId: string, roles: string) {
    return this.http.post(
      `${environment.back_end}/project/${projectId}/members/change-role`,
      {
        userId,
        roles,
      },
      {
        withCredentials: true,
      }
    );
  }
}
