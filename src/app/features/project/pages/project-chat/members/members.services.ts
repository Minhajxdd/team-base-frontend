import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.development';
import { projectMember } from '../../project-members/project-members-display/project-members.dispaly.model';

@Injectable({
  providedIn: 'root',
})
export class MembersServices {
  constructor(private http: HttpClient) {}

  FetchProjectMembers(projectId: string) {
    return this.http.get<projectMember[]>(
      `${environment.back_end}/project/${projectId}/members/details`,
      {
        withCredentials: true,
      }
    );
  }
}
