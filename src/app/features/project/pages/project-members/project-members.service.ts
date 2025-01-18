import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { sentRequest, UsersResponse } from './project-members.model';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectMemberService {
  constructor(
    private readonly http: HttpClient,
    private readonly messageService: MessageService
  ) {}

  getUserData(query: string) {
    query = query.toLocaleLowerCase();

    return this.http.get<UsersResponse[]>(
      `${environment.back_end}/users/?query=${query}&select=email&limit=5`,
      { withCredentials: true }
    );
  }

  showToast(severity = 'success', summary: string, detail: string = '') {
    return this.messageService.add({
      severity,
      summary,
      detail,
    });
  }

  sentRequest(data: sentRequest, projectId: string) {
    return this.http
      .post(
        `${environment.back_end}/project/${projectId}/members/sent-request`,
        data,
        {
          withCredentials: true,
        }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
