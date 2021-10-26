import { createStore, combineReducers } from "redux";
import { valueReducer } from "./valueReduce";
import { tasksReducer } from "./tasksReduce";
import { filterReducer } from "./filterReduce";
import { isFilterReducer } from "./isFilterReduce";

const reducer = combineReducers({
  inputState: valueReducer,
  tasksState: tasksReducer,
  filterState: filterReducer,
  isFilterState: isFilterReducer,
});

export const store = createStore(
  reducer, //@ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export type RootState = ReturnType<typeof store.getState>;
