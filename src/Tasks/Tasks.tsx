import css from "./styles.module.css";
import { RootState, Task } from "../store";
import { Checkbox } from "../Checkbox";
import { connect } from "react-redux";
import { TASK_ACTIONS, TASK_STATUSES } from "../store";

interface ReduxStateProps {
  tasks: Task[];
  select: string;
}

interface ReduxDispatchProps {
  onChange: (v: number) => void;
}

const BaseTasks: React.FC<ReduxStateProps & ReduxDispatchProps> = ({
  tasks,
  select,
  onChange,
}) => {
  let selectTasks: Task[] = [];
    if (select === TASK_STATUSES.ALL) {
      selectTasks = tasks;
    } else if (select === TASK_STATUSES.TODO) {
      selectTasks = tasks.filter((task) => !task.isChecked);
    } else if (select === TASK_STATUSES.DONE) {
      selectTasks = tasks.filter((task) => task.isChecked);
    }
  return (
    <ul className={css.list}>
      {selectTasks.map((task) => (
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
    select: state.filterState.selected,
  };
};

const mapDispathProps = (dispatch: any) => {
  return {
    onChange: (id: number) => dispatch({ type: TASK_ACTIONS.CHECK_TASK, id }),
  };
};

export const Tasks = connect(mapStateProps, mapDispathProps)(BaseTasks);
