import { TASK_ACTIONS } from "..";

export interface FilterState {
  selected: string;
}

const INITIAL_STATE: FilterState = { selected: "all" };

export const filterReducer = (
  store: FilterState = INITIAL_STATE,
  action: { type: TASK_ACTIONS.SELECT_TASKS; payload: string }
) => {
  if (action.type === "selectTasks") {
    const { payload } = action;
    return { ...store, selected: payload };
  }
  return store;
};
