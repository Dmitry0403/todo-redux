export interface Task {
  title: string;
  isDone: boolean;
  id: string;
}

export interface StateTask {
  value: string;
  tasks: Task[];
  isFilter: boolean;
  select: string;
}

export enum TASK_ACTIONS {
  CHANGE_VALUE = "changeValue",
  ADD_TASK = "addTask",
  TOGGLE_TASK = "toggleTask",
  SELECT_TASKS = "selectTasks",
  IS_FILTER = "isFilter",
  DELETE_TASK = "deleteTask",
  GET_TODOS = "getTodos",
  GET_TODOS_SUCCESS = "getTodosSuccess",
  GET_TODOS_FAILURE = "getTodosFailure",
  ADD_TODO = "addTodo"
} 

export enum TASK_STATUSES {
  ALL = "all",
  TODO = "todo",
  DONE = "done",
}

export enum LOAD_STATUSES {
  LOADING = "loading",
  SUCCESS = "loaded",
  FAILURE = "failure"
}
