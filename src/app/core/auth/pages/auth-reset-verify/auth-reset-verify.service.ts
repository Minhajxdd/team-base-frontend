import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthResetVerifyService {
  constructor(private http: HttpClient) {}

  sendOtp(otp: string) {
    console.log('here')
    return this.http
      .post(
        `${environment.back_end}/auth/reset-password/verify`,
        {
          otp,
        },
        { withCredentials: true }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
