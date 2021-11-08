import { RootState } from "../store";
// import { createSelector } from 'reselect'

export const getTasksState = (state:RootState) => state.tasksState.todos