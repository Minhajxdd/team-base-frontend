import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.js';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectRequestAcceptService {
  constructor(private readonly http: HttpClient) {}

  sendAcceptRequest(projectId: string, token: string) {
    return this.http
      .post(
        `${environment.back_end}/project/${projectId}/members/accept-request?token=${token}`,
        {},
        { withCredentials: true }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
