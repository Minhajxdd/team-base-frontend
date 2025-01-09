import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export function TokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const token = authService.getAccessToken;

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set(`Authorization`, `Bearer ${token}`),
    });
    console.log(cloned);
    return next(cloned);
  }
  return next(req);
}
