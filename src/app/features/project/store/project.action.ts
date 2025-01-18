import { createAction, props } from "@ngrx/store";

export const addProjectId = createAction(
    'AddProjectId',
    props<{projectId: string}>()
)