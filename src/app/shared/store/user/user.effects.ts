import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { UserService } from './service/user.service';
import * as UserActions from './user.actions';
import { selectUser } from './user.selector';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private userService = inject(UserService);

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      withLatestFrom(this.store.pipe(select(selectUser))),
      mergeMap(([_, existingUser]) => {
        if (existingUser.id) {
          return of(UserActions.loadUserSuccess({ user: existingUser }));
        } else {
          return this.userService.getUser().pipe(
            map((response) =>
              UserActions.loadUserSuccess({
                user: {
                  id: response.data.user._id,
                  fullName: response.data.user.full_name,
                  email: response.data.user.email,
                  profile: response.data.user.profile,
                },
              })
            ),
            catchError((error) => of(UserActions.loadUserFailure({ error })))
          );
        }
      })
    )
  );

  //   updateProfilePicture$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(UserActions.updateProfilePicture),
  //       mergeMap(({ profile }) =>
  //         this.userService.updateProfile(profile).pipe(
  //           map((response) =>
  //             UserActions.updateProfilePictureSuccess({
  //               profile: response.data.user.profile,
  //             })
  //           ),
  //           catchError((error) =>
  //             of(UserActions.updateProfilePictureFailure({ error }))
  //           )
  //         )
  //       )
  //     )
  //   );
}
