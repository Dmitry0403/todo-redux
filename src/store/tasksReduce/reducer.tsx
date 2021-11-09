import { Action } from "redux";
import { Task } from "../constans";
import { TASK_ACTIONS, LOAD_STATUSES } from "../constans";

export interface TasksType {
  todos: Task[];
  loadStatus: LOAD_STATUSES;
}

let INITIAL_STATE: TasksType = { todos: [], loadStatus: LOAD_STATUSES.SUCCESS };

export const tasksReducer = (
  store: TasksType = INITIAL_STATE,
  action: Action<TASK_ACTIONS>
): TasksType => {
  switch (action.type) {
    case TASK_ACTIONS.GET_TODOS:
      return {
        ...store,
        loadStatus: LOAD_STATUSES.LOADING,
      };
    case TASK_ACTIONS.GET_TODOS_SUCCESS:
      const { todos: tasks } = action as {
        type: TASK_ACTIONS.GET_TODOS_SUCCESS;
        todos: Task[];
      };
      if (tasks) {
        return {
          ...store,
          todos: tasks,
          loadStatus: LOAD_STATUSES.SUCCESS,
        };
      }
      return {
        ...store,
        loadStatus: LOAD_STATUSES.SUCCESS,
      };
    case TASK_ACTIONS.GET_TODOS_FAILURE:
      return {
        ...store,
        loadStatus: LOAD_STATUSES.FAILURE,
      };
    default:
      return store;
  }
};
