import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AddCommentsInputService {
  constructor(private http: HttpClient) {}

  addComment(comment: string, taskId: string, projectId: string) {
    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;

    const data = {
      comment,
      date: formattedDate,
      taskId,
    };

    return this.http.post(
      `${environment.back_end}/project/${projectId}/tasks/comments`,
      data,
      {
        withCredentials: true,
      }
    );
  }
}
