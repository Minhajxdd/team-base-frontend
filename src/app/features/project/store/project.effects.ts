import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { environment } from '../../../../environments/environment.development';
import * as ProjectActions from './project.action';
import { selectProjectId } from './project.selector';

@Injectable()
export class ProjectEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private store = inject(Store);

  validateUserAccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.addProjectId),
      withLatestFrom(this.store.select(selectProjectId)),
      exhaustMap(([action, projectId]) => {
        if (!projectId) {
          console.error('Project ID is missing or undefined');
          return of(ProjectActions.clearProject());
        }

        return this.http
          .post<{ role: string, userId: string }>(
            `${environment.back_end}/project/${projectId}/validate`,
            {},
            { withCredentials: true }
          )
          .pipe(
            map((response) =>
              ProjectActions.validateUserAccessSuccess({
                role: response.role,
                userId: response.userId,
              })
            ),
            catchError((error) => {
              console.error('Error validating user access:', error);
              return of(ProjectActions.clearProject());
            })
          );
      })
    )
  );
}
