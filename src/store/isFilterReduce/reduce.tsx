import { TASK_ACTIONS } from "..";

export interface isFilterType {
  isFilter: boolean;
}

const INITIAL_STATE: isFilterType = { isFilter: false };

export const isFilterReducer = (
  store: isFilterType = INITIAL_STATE,
  action: { type: TASK_ACTIONS.IS_FILTER }
) => {
  if (action.type === "isFilter") {
    return {
      ...store,
      isFilter: !store.isFilter,
    };
  }
  return store;
};
