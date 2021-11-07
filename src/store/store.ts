import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
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
  reducer,
  applyMiddleware(thunk)
  // @ts-ignore
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export type RootState = ReturnType<typeof store.getState>;
