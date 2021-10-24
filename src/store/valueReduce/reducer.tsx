import { TASK_ACTIONS } from "..";
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
    case "changeValue":
      const { payload } = action;
      return { ...store, value: payload };
    case "addTask":
      return { ...store, value: "" };
    default:
      return store;
  }
};
