import { createFeatureSelector, createSelector } from '@ngrx/store';
import { projectModel } from './model/project.model';

const selectProjectState = createFeatureSelector<projectModel>('project');

export const selectProjectId = createSelector(selectProjectState, (state) => {
  return state.projectId;
});

export const selectProjectRole = createSelector(
  selectProjectState,
  (state) => state.role
);

export const selectProjectUserId = createSelector(
  selectProjectState,
  (state) => state.userId
);
