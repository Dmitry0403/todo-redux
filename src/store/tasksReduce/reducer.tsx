import { Task } from "..";


export interface TasksType {
  tasks: Task[];
}

const INITIAL_STATE: TasksType = { tasks: [] };

export const tasksReducer = (
  store: TasksType = INITIAL_STATE,
  action: {
    type: "addTask";
  }
): TasksType => {
  if (action.type === "addTask") {
    const { tasks } = store;
   
    return {
      ...store,
      tasks: tasks.concat([{ title: value, isChecked: false, id: Date.now() }]),
    };
  }

  return store;
};
