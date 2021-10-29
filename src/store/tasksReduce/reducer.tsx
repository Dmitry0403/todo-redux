import { v4 as uuidv4 } from "uuid";
import { Task } from "../constans";
import { TASK_ACTIONS } from "../constans";
export interface TasksType {
  tasks: Task[];
}

let INITIAL_STATE: TasksType = { tasks: [] };

if (localStorage.getItem("TODOS")) {
  INITIAL_STATE = {
    tasks: JSON.parse(localStorage.getItem("TODOS") as string),
  };
}

export const tasksReducer = (
  store: TasksType = INITIAL_STATE,
  action:
    | {
        type: TASK_ACTIONS.ADD_TASK;
        payload: string;
      }
    | { type: TASK_ACTIONS.CHECK_TASK; id: string }
    | { type: TASK_ACTIONS.DELETE_TASK; taskId: string }
): TasksType => {
  const { tasks } = store;
  switch (action.type) {
    case TASK_ACTIONS.ADD_TASK:
      const { payload } = action;
      if (payload.trim()) {
        return {
          ...store,
          tasks: tasks.concat([
            { title: payload, isChecked: false, id: uuidv4() },
          ]),
        };
      }
      return store;
    case TASK_ACTIONS.CHECK_TASK:
      const { id } = action;
      return {
        ...store,
        tasks: tasks.map((item) => {
          if (item.id === id) {
            return { ...item, isChecked: !item.isChecked };
          }
          return item;
        }),
      };
    case TASK_ACTIONS.DELETE_TASK:
      const { taskId } = action;
      return {
        ...store,
        tasks: tasks.filter((item) => item.id !== taskId),
      };
    default:
      return store;
  }
};
