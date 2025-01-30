import { createAction, props } from '@ngrx/store';

export const loadUser = createAction('[User] Load User');

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{
    user: { id: string; fullName: string; email: string; profile: string };
  }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);

export const updateProfilePicture = createAction(
  '[User] Update Profile Picture',
  props<{ profile: string }>()
);

export const updateProfilePictureSuccess = createAction(
  '[User] Update Profile Picture Success',
  props<{ profile: string }>()
);

export const updateProfilePictureFailure = createAction(
  '[User] Update Profile Picture Failure',
  props<{ error: any }>()
);
