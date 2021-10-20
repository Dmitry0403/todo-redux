export interface Task {
  title: string;
  isChecked: boolean;
  id: number;
}

export enum TASK_STATUSES {
  ALL = "all",
  TODO = "todo",
  DONE = "done",
}
