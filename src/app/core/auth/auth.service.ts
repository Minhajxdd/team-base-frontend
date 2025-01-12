import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, switchMap, tap } from 'rxjs';

import { jwtDecode, JwtPayload } from 'jwt-decode';

import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private accessToken: string | null = null;

  set setAccessToken(token: string | null) {
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
          this.setAccessToken = this.getCookie('access_token');
        }),
        switchMap((response) => of(response.access_token))
      );
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
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

  private getDecodedAccessToken(token: string) {
    try {
      return jwtDecode(token);
    } catch (err) {
      return null;
    }
  }

  userInProject(projectId: any ){
    if(this.accessToken) {
      return this.getDecodedAccessToken(this.accessToken);
    
    }
    return null;
  }
}
