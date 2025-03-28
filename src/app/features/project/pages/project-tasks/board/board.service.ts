import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.js';
import { BoardCardModel } from './board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  getTasks(projectId: string, memberId: string | null = null) {
    let url = `${environment.back_end}/project/${projectId}/tasks`;

    if (memberId && memberId !== 'null') {
      url += `?member=${memberId}`;
    }

    return this.http.get<BoardCardModel[]>(url, {
      withCredentials: true,
    });
  }

  updateTaskStatus(projectId: string, taskId: string, status: string) {
    return this.http.patch(
      `${environment.back_end}/project/${projectId}/tasks`,
      {
        taskId,
        status,
      },
      {
        withCredentials: true,
      }
    );
  }
}
