export interface Task {
  title: string;
  isChecked: boolean;
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
  CHECK_TASK = "checkTask",
  SELECT_TASKS = "selectTasks",
  IS_FILTER = "isFilter",
  DELETE_TASK = "deleteTask"
} 

export enum TASK_STATUSES {
  ALL = "all",
  TODO = "todo",
  DONE = "done",
}