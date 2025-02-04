import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentsCardService {
  constructor(private http: HttpClient) {}

  deleteCard(commentId: string, taskId: string, projectId: string) {
    return this.http.delete(
      `${environment.back_end}/project/${projectId}/tasks/comments?comment-id=${commentId}&task-id=${taskId}`,
      {
        withCredentials: true,
      }
    );
  }
}
