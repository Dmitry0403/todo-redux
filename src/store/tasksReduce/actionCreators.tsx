import { TASK_ACTIONS } from "../constans";

export const getAddTask = (payload: string) => {
  return { type: TASK_ACTIONS.ADD_TASK, payload };
};

export const getCheckTask = (id: string) => {
  return { type: TASK_ACTIONS.CHECK_TASK, id };
};

export const getDeleteTask = (taskId: string) => {
  return { type: TASK_ACTIONS.DELETE_TASK, taskId };
};
