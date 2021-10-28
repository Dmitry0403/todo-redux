import { TASK_ACTIONS } from "../constans";

export interface isFilterType {
  isFilter: boolean;
}

const INITIAL_STATE: isFilterType = { isFilter: false };

export const isFilterReducer = (
  store: isFilterType = INITIAL_STATE,
  action: { type: TASK_ACTIONS.IS_FILTER }
) => {
  if (action.type === TASK_ACTIONS.IS_FILTER) {
    return {
      ...store,
      isFilter: !store.isFilter,
    };
  }
  return store;
};
