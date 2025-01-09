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
export class UserAuthGuard implements CanActivate {
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
          this.router.navigate(['login']);
          return false;
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        this.router.navigate(['login']);
        return false;
      }
    }

    return true;
  }
}
