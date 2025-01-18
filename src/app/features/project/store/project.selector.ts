import { createFeatureSelector, createSelector } from "@ngrx/store";
import { projectModel } from "./model/project.model";


const getProjectState = createFeatureSelector<projectModel>('project');


export const getProjectId = createSelector(getProjectState, (state) => {
    return state.projectId;
})