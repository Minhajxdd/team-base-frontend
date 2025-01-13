import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthResetPwEmailService {
  constructor(private http: HttpClient) {}

  sendEmail(email: string) {
    return this.http
      .post(
        `${environment.back_end}/auth/reset-password`,
        { email },
        { withCredentials: true }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
