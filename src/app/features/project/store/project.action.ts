import { createAction, props } from '@ngrx/store';

export const addProjectId = createAction(
  '[Project] AddProjectId',
  props<{ projectId: string }>()
);

export const validateUserAccessSuccess = createAction(
  '[Project] Validate User Access Success',
  props<{ role: string }>()
);

export const clearProject = createAction('[Project] Clear Project');
