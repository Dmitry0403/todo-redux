import { v4 as uuidv4 } from "uuid";
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
  const { todos } = store;
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
    case TASK_ACTIONS.ADD_TASK:
      const { payload } = action as {
        type: TASK_ACTIONS.ADD_TASK;
        payload: string;
      };
      if (payload.trim()) {
        const newTasks = todos.concat([
          { title: payload, isDone: false, id: uuidv4() },
        ]);
        fetch("api/todos", { method: "POST", body: JSON.stringify(newTasks) });
        return {
          ...store,
          todos: newTasks,
        };
      }
      return store;
    case TASK_ACTIONS.DONE_TASK:
      const { id } = action as {
        type: TASK_ACTIONS.DONE_TASK;
        id: string;
      };
      const newTasks = todos.map((item) => {
        if (item.id === id) {
          return { ...item, isDone: !item.isDone };
        }
        return item;
      });
      fetch(`api/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify(newTasks),
      });
      return {
        ...store,
        todos: newTasks,
      };
    case TASK_ACTIONS.DELETE_TASK:
      const { taskId } = action as {
        type: TASK_ACTIONS.DELETE_TASK;
        taskId: string;
      };
      const newTodos = todos.filter((item) => item.id !== taskId);
      fetch("api/todos", { method: "POST", body: JSON.stringify(newTodos) });
      return {
        ...store,
        todos: newTodos,
      };
    default:
      return store;
  }
};
