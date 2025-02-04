import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AddTaskService {
  private http = inject(HttpClient);

  addSubTask(title: string, taskId: string, projectId: string) {
    return this.http.post(
      `${environment.back_end}/project/${projectId}/tasks/sub-tasks`,
      {
        title,
        taskId,
      },
      {
        withCredentials: true,
      }
    );
  }
}
