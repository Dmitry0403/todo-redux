import { Task } from "..";
import { TASK_ACTIONS } from "..";

export interface TasksType {
  tasks: Task[];
}

let INITIAL_STATE: TasksType = { tasks: [] };

if (localStorage.getItem("TODOS")) {
 //@ts-ignore
  INITIAL_STATE = {tasks: JSON.parse(localStorage.getItem("TODOS"))}
}

export const tasksReducer = (
  store: TasksType = INITIAL_STATE,
  action:
    | {
        type: TASK_ACTIONS.ADD_TASK;
        payload: string;
      }
    | { type: TASK_ACTIONS.CHECK_TASK; id: number }
    | { type: TASK_ACTIONS.DELETE_TASK; taskId: number }
): TasksType => {
  const { tasks } = store;
  switch (action.type) {
    case "addTask":
      const { payload: value } = action;
      if (value.trim()) {
        return {
          ...store,
          tasks: tasks.concat([
            { title: value, isChecked: false, id: Date.now() },
          ]),      
        };
      }
      return store;
    case "checkTask":
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
    case "deleteTask":
      const { taskId } = action;
      return {
        ...store,
        tasks: tasks.filter((item) => item.id !== taskId),
      };
    default:
      return store;
  }
};

