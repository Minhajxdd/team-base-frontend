import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CreateProjectResponse } from '../home-component.mode';

@Injectable({
  providedIn: 'root',
})
export class HomeStartNewProjectService {
  private readonly http = inject(HttpClient);

  createProject(projectData: { name: string; description: string }) {
    console.log(projectData);
    return this.http.post<CreateProjectResponse>(
      `${environment.back_end}/project/create`,
      projectData,
      {
        withCredentials: true,
      }
    );
  }
}
