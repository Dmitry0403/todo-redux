import { TASK_ACTIONS } from "../constans";

export const filterSelect = (payload: string) => ({
  type: TASK_ACTIONS.SELECT_TASKS,
  payload,
});
