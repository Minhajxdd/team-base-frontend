import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SubTaskService {
  private http = inject(HttpClient);

  editSubStatus(taskId: string, subTaskId: string, projectId: string) {
    return this.http.patch(
      `${environment.back_end}/project/${projectId}/tasks/sub-tasks`,
      {
        taskId,
        subTaskId,
      },
      {
        withCredentials: true,
      }
    );
  }

  deleteSubTask(taskId: string, subTaskId: string, projectId: string) {
    return this.http.delete(
      `${environment.back_end}/project/${projectId}/tasks/sub-tasks?sub-id=${subTaskId}&task-id=${taskId}`,
      {
        withCredentials: true,
      }
    );
  }
}
