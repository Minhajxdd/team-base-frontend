import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { DataModel } from '../auth-form-component/auth-form-component.model';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminFormService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  login(userData: DataModel) {
    return this.http
      .post<{ access_token: string }>(
        `${environment.back_end}/auth/login`,
        userData,
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((data) => {
          this.authService.setAccessToken = this.getCookie('access_token');
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  getCookie(name: string): string | null {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
    return match ? decodeURIComponent(match[2]) : null;
  }
}
