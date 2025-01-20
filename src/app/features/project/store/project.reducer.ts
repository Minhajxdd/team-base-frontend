import { createReducer, on } from '@ngrx/store';
import { intialState } from './project.state';
import {
  addProjectId,
  clearProject,
  validateUserAccessSuccess,
} from './project.action';

const _projectReducer = createReducer(
  intialState,
  on(addProjectId, (state, action) => ({
    ...state,
    projectId: action.projectId,
  })),
  on(validateUserAccessSuccess, (state, action) => ({
    ...state,
    role: action.role,
    userId: action.userId,
  })),
  on(clearProject, (state, action) => intialState)
);

export function ProjectReducer(state: any, action: any) {
  return _projectReducer(state, action);
}
