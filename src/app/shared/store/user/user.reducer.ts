import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { initialState } from './user.state';

export const userReducer = createReducer(
  initialState,

  on(UserActions.loadUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    profile: user.profile,
    loading: false,
  })),

  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UserActions.updateProfilePicture, (state) => ({
    ...state,
    loading: true,
  })),

  on(UserActions.updateProfilePictureSuccess, (state, { profile }) => ({
    ...state,
    profile,
    loading: false,
  })),
);
