import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment.js';
import { TaskModel } from './task-modal.model';

@Injectable({
  providedIn: 'root',
})
export class TaskModalFetchService {
  constructor(private http: HttpClient) {}

  getTasks(projectId: string, taskId: string) {
    return this.http.get<TaskModel>(
      `${environment.back_end}/project/${projectId}/tasks/details?task-id=${taskId}`,
      { withCredentials: true }
    );
  }
}
