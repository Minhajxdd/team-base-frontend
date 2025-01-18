import { createReducer, on } from '@ngrx/store';
import { intialState } from './project.state';
import { addProjectId } from './project.action';

const _projectReducer = createReducer(
  intialState,
  on(addProjectId, (state, action) => ({
    ...state,
    projectId: action.projectId,
  }))
);

export function ProjectReducer(state: any, action: any) {
  return _projectReducer(state, action);
}
