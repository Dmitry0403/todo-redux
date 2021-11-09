import { RootState } from "../store";
// import { createSelector } from 'reselect'

export const getTasksState = (state:RootState) => state.tasksState.todos
export const getLoadingState = (state:RootState) => state.tasksState.loadStatus