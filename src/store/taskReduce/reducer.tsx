import { Task } from "../constans";
 
const tasks:Task[] = [];


export const tasksReducer = (
  store: Task[] = tasks,
  action: { type: "addTask"; e: React.FormEvent<HTMLFormElement> }
): any => {
  const { e } = action;
   e.preventDefault();
  if (action.type === "addTask") {
    return {
      ...store,
      tasks: store.tasks.concat([
        { title: value, isChecked: false, id: Date.now() },
      ]),
      value: "",
    };
  }
  return store;
}
