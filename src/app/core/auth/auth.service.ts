import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private accessToken: string | null = null;

  set setAccessToken(token: string) {
    this.accessToken = token;
  }

  get getAccessToken() {
    return this.accessToken;
  }

  refreshAccessToken() {
    return this.http
      .post<{ access_token: string }>(
        `${environment.back_end}/auth/refresh`,
        {},
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          this.setAccessToken = response.access_token;
        }),
        switchMap((response) => of(response.access_token))
      );
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  logout() {
    return this.http
      .post(
        `${environment.back_end}/auth/logout`,
        {},
        { withCredentials: true }
      )
      .subscribe({
        complete: () => {
          (this.setAccessToken = ''), this.router.navigate(['login']);
        },
      });
  }
}
