import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

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
    this.accessToken = null;
  }
}
