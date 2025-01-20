import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.development';
import { BoardCardModel } from './board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  getTasks(projectId: string) {
    return this.http.get<BoardCardModel[]>(
      `${environment.back_end}/project/${projectId}/tasks`,
      {
        withCredentials: true,
      }
    );
  }

  updateTaskStatus(projectId: string, taskId: string, status: string) {
    return this.http.patch(
      `${environment.back_end}/project/${projectId}/tasks`,
      {
        taskId,
        status
      },
      {
        withCredentials: true,
      }
    );
  }
}
