import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment.development'; 
import { ProjectResponse } from '../home-component.mode';

@Injectable({
  providedIn: 'root',
})
export class HomeYourProjectsService {
  private readonly http = inject(HttpClient);

  getProjectDetails() {
    return this.http.get<ProjectResponse>(
      `${environment.back_end}/project/`,
      { withCredentials: true }
    );
  }
}
