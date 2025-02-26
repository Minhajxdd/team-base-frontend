import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.js';
import { LatestTasks } from './latest-task.model';

@Injectable({
  providedIn: 'root',
})
export class LatestTaksBoxService {
  constructor(protected readonly http: HttpClient) {}

  getLatestTasks(projectId: string) {
    return this.http.get<LatestTasks>(
      `${environment.back_end}/project/${projectId}/tasks/latest-tasks`,
      {
        withCredentials: true,
      }
    );
  }
}
