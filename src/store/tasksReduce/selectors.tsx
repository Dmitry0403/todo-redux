import { RootState } from "../store";
import { createSelector } from "reselect";
import { getFilterState } from "../filterReduce";
import { TASK_STATUSES } from "../constans";

export const getTasksState = (state: RootState) => state.tasksState.todos;
export const getLoadingState = (state: RootState) =>
  state.tasksState.loadStatus;

export const getTasks = createSelector(
  getTasksState,
  getFilterState,
  (todos, select) => {
    switch (select) {
      case TASK_STATUSES.TODO:
        return todos.filter((item) => item.isDone === true);
      case TASK_STATUSES.DONE:
        return todos.filter((item) => item.isDone === false);
      default:
        return todos;
    }
  }
);
