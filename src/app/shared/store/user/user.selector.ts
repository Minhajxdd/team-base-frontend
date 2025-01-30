import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.model';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(selectUserState, (state) => ({
  id: state.id || '',
  fullName: state.fullName || '',
  email: state.email || '',
  profile: state.profile || '',
}));

export const selectUserProfile = createSelector(
  selectUserState,
  (state) => state.profile
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.error
);
