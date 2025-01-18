import { DestroyRef, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { catchError, filter, first, map, switchMap } from 'rxjs/operators';
import * as ProjectActions from '../../features/project/store/project.action';
import {
  selectProjectRole,
  selectProjectId,
} from '../../features/project/store/project.selector';

@Injectable({
  providedIn: 'root',
})
export class ProjectRolesGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    private destroyRef: DestroyRef
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projectId = route.params['projectId'];

    if (!projectId) {
      this.router.navigate(['']);
      return of(false);
    }

    this.store.dispatch(ProjectActions.addProjectId({ projectId }));

    return this.store.select(selectProjectRole).pipe(
      filter((role) => !!role),
      first(),
      map(() => true),
      catchError(() => {
        this.router.navigate(['']);
        return of(false);
      })
    );
  }
}
