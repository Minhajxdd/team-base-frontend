import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { DataModel } from './auth-form-component.model';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../../auth.service';
import { RegisterResponseModel } from './auth-form.model';

@Injectable({
  providedIn: 'root',
})
export class AuthFormService {
  private readonly http = inject(HttpClient);

  register(userData: DataModel) {
    return this.http
      .post<RegisterResponseModel>(
        environment.back_end + '/auth/register',
        userData,
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
