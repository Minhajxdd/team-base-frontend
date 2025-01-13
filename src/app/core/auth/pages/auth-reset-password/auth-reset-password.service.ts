import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthResetPasswordService {
  constructor(private http: HttpClient) {}

  resetPassword(newPassword: string) {
    return this.http
      .post(
        `${environment.back_end}/auth/reset-password/change`,
        {
          newPassword,
        },
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
