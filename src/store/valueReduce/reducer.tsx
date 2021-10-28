import { TASK_ACTIONS } from "../constans";
import { Action } from "redux";

export interface ValueInput {
  value: string;
}

const INITIAL_STATE: ValueInput = { value: "" };

export const valueReducer = (
  store: ValueInput = INITIAL_STATE,
  action: Action<Omit<TASK_ACTIONS, "changeValue">> & {
    type: TASK_ACTIONS.CHANGE_VALUE;
    payload: string;
  }
): ValueInput => {
  switch (action.type) {
    case TASK_ACTIONS.CHANGE_VALUE:
      const { payload } = action;
      return { ...store, value: payload };
    case TASK_ACTIONS.ADD_TASK:
      return { ...store, value: "" };
    default:
      return store;
  }
};
