import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environmentts';
import { projectMember } from './project-members.dispaly.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectMembersDisplayComponentService {
  constructor(private http: HttpClient) {}

  getProjectMembers(projectId: string, role: string) {
    return this.http.get<projectMember[]>(
      `${environment.back_end}/project/${projectId}/members/details?role=${role}`,
      { withCredentials: true }
    );
  }
}
