import css from "./styles.module.css";
import { Task } from "../types";
import { Checkbox } from "../Checkbox/Checkbox";

interface TasksProps {
  tasks: Task[];
  onChange: (v: number) => void;
}

export const Tasks: React.FC<TasksProps> = ({ tasks, onChange }) => {
  return (
    <ul className={css.list}>
      {tasks.map((task) => (
        <li key={task.id} className={css.listTask}>
          <Checkbox
            onChange={() => onChange(task.id)}
            checked={task.isChecked}
          />
          <span>{task.title}</span>
        </li>
      ))}
    </ul>
  );
};
