import { TASK_ACTIONS } from "..";

export interface FilterType {
  selected: string;
}

const INITIAL_STATE: FilterType = { selected: "all" };

export const filterReducer = (
  store: FilterType = INITIAL_STATE,
  action: { type: TASK_ACTIONS.SELECT_TASKS; payload: string }
) => {
  if (action.type === "selectTasks") {
    const { payload } = action;
    return { ...store, selected: payload };
  }
  return store;
};
