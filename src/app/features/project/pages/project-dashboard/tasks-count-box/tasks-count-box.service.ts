import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.js';

@Injectable({
  providedIn: 'root',
})
export class TasksCountBoxService {
  constructor(private readonly http: HttpClient) {}

  getTasksCount(projectId: string) {
    return this.http.get<{ data:  { _id: { status: string }; count: number }[] }>(
      `${environment.back_end}/project/${projectId}/tasks/count`,
      {
        withCredentials: true,
      }
    );
  }
}
