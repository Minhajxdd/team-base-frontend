import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProjectAuthService {
  private rolesForProjects = new Map<string, BehaviorSubject<string | null>>();

  constructor(private http: HttpClient) {}

  validateUserAccess(projectId: string): Observable<{ role: string }> {
    return this.http.post<{ role: string }>(
      `${environment.back_end}/project/${projectId}/validate`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  setRoleForProject(projectId: string, role: string): void {
    if (!this.rolesForProjects.has(projectId)) {
      this.rolesForProjects.set(
        projectId,
        new BehaviorSubject<string | null>(null)
      );
    }
    this.rolesForProjects.get(projectId)!.next(role);
  }

  getRoleForProject(projectId: string): Observable<string | null> {
    if (!this.rolesForProjects.has(projectId)) {
      this.rolesForProjects.set(
        projectId,
        new BehaviorSubject<string | null>(null)
      );
    }
    return this.rolesForProjects.get(projectId)!.asObservable();
  }

  clearRoles(): void {
    this.rolesForProjects.clear();
  }
}
