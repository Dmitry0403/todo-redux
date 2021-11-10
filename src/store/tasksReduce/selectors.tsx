import { RootState } from "../store";
import { createSelector } from "reselect";

export const getTasksState = (state: RootState) => state.tasksState.todos;
export const getLoadingState = (state: RootState) =>
  state.tasksState.loadStatus;

export const getDoneTasks = createSelector(getTasksState, (todos) =>
  todos.filter((item) => item.isDone === true)
);

export const getTodoTasks = createSelector(getTasksState, (todos) =>
  todos.filter((item) => item.isDone === false)
);
