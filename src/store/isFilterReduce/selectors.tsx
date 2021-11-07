import { RootState } from "../store";

export const getIsFilterState = (state: RootState) =>
  state.isFilterState.isFilter;
