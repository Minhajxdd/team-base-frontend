import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environmentts';
import { CreateProjectResponse } from '../home-component.mode';

@Injectable({
  providedIn: 'root',
})
export class HomeStartNewProjectService {
  private readonly http = inject(HttpClient);

  createProject(projectData: { name: string; description: string, capacity: number }) {
 
    return this.http.post<CreateProjectResponse>(
      `${environment.back_end}/project/create`,
      projectData,
      {
        withCredentials: true,
      }
    );
  }
}
