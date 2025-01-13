declare var google: any;
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { googleData } from '../pages/auth-form-component/auth-form.model';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  signOut() {
    google.accounts.id.disableAutoSelect();
    this.authService.logout();
  }

  googleLogin(googleData: {
    email: string;
    fullName: string;
    jetId?: string;
    picture?: string;
  }) {
    return this.http
      .post(`${environment.back_end}/auth/google`, googleData, {
        withCredentials: true,
      })
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
