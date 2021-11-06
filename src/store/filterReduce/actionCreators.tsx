import { TASK_ACTIONS } from "../constans";

export const getFilterSelect = (payload: string) => ({
  type: TASK_ACTIONS.SELECT_TASKS,
  payload,
});
