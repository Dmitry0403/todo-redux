import css from "./styles.module.css";
import { RootState, Task } from "../store";
import { Checkbox } from "../Checkbox";
import { connect } from "react-redux";

interface ReduxStateProps {
  tasks: Task[];
}

interface ReduxDispatchProps {
  onChange: (v: number) => void;
}

export const BaseTasks: React.FC<ReduxStateProps & ReduxDispatchProps> = ({
  tasks,
  onChange,
}) => {
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

const mapStateProps = (state: RootState): ReduxStateProps => {
  return {
    tasks: state.tasksState.tasks,
  };
};

const mapDispathProps = (dispatch: any) => {
  return {
    onChange: (paylaod: number) => dispatch({ type: "doneTask" }, paylaod),
  };
};

export const Tasks = connect(mapStateProps, mapDispathProps)(BaseTasks);
