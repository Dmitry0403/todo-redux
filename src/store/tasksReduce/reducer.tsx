import { Task } from "..";
import { TASK_ACTIONS } from "..";

export interface TasksType {
  tasks: Task[];
}

const INITIAL_STATE: TasksType = { tasks: [] };

export const tasksReducer = (
  store: TasksType = INITIAL_STATE,
  action:
    | {
        type: TASK_ACTIONS.ADD_TASK;
        payload: string;
      }
    | { type: TASK_ACTIONS.CHECK_TASK; id: number }
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
      console.log(id);
      return {
        ...store,
        tasks: tasks.map((item) => {
          if (item.id === id) {
            return { ...item, isChecked: !item.isChecked };
          }
          return item;
        }),
      };
    default:
      return store;
  }
};
