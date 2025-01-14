import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { AuthService } from '../../auth.service';
import { catchError, tap, throwError } from 'rxjs';
import { RegisterResponseModel } from '../auth-form-component/auth-form.model';

@Injectable({
  providedIn: 'root',
})
export class AuthOtpPageService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  verify(otp: string) {
    return this.http
      .post<RegisterResponseModel>(
        `${environment.back_end}/auth/register/verify`,
        {
          otp,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((data) => {
          this.authService.setAccessToken = data.access_token;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
