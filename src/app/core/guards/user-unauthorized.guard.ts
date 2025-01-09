import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserUnauthorizedAuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      try {
        await this.authService.refreshAccessToken().toPromise();

        isAuthenticated = this.authService.isAuthenticated();

        if (!isAuthenticated) {
          return true;
        }
      } catch (error) {
        return true;
      }
    }

    const authRouters = ['login', 'register'];

    if (authRouters.some((keyword) => route.url[0].path.includes(keyword))) {
        this.router.navigate(['']);
    }

    return false;
  }
}
