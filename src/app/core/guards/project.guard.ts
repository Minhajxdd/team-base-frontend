import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProjectAuthService } from '../auth/services/auth.project.roles.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectRolesGuard implements CanActivate {
  constructor(
    private projectAuthService: ProjectAuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const projectId = route.params['projectId'];

    if (!projectId) {
      return of(false);
    }

    return this.projectAuthService.validateUserAccess(projectId).pipe(
      map((response) => {
        if (response && response.role) {
          this.projectAuthService.setRoleForProject(projectId, response.role);
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['']);
        return of(false);
      })
    );
  }
}
