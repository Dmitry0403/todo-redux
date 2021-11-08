import { TASK_ACTIONS } from "../constans";

export const inputValue = (payload: string) => {
  return { type: TASK_ACTIONS.CHANGE_VALUE, payload };
};

