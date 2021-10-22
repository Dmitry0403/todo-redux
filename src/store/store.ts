import { createStore, combineReducers } from "redux";
import { valueReducer } from './inputReduce';
import { tasksReducer } from "./taskReduce";

const reducer = combineReducers({
  value: valueReducer,
  tasks: tasksReducer,
});

export const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;

