import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { DataModel } from './pages/auth-form-component/auth-form-component.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  register(userData: DataModel) {
    return this.http
      .post(environment.back_end + '/auth/register', userData)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( () => err.error.message);
        })
      );
  }
}
