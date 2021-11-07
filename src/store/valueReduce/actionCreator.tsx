import { TASK_ACTIONS } from "../constans";

export const getInputValue = (payload: string) => {
  return { type: TASK_ACTIONS.CHANGE_VALUE, payload };
};
