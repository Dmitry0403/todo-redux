import { createStore, combineReducers } from "redux";
import { valueReducer } from './valueReduce';
import { tasksReducer } from "./tasksReduce";


const reducer = combineReducers({
  inputState: valueReducer,
  tasksState: tasksReducer,
});

export const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;

