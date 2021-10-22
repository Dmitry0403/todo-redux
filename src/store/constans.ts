import { ValueInput } from "./valueReduce"

export interface Task {
    title: ValueInput;
    isChecked: boolean;
    id: number;
  }
  
  export interface StateTask {
    value: string;
    tasks: Task[];
    isFilter: boolean;
    select: string;
  }

  export enum TASK_STATUSES {
    ALL = "all",
    TODO = "todo",
    DONE = "done",
  }
   
  export const INITIAL_STATE_STORE = {
    value: "",
    tasks: [],
    isFilter: false,
    select: TASK_STATUSES.ALL,
  }

 