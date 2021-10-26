import css from "./styles.module.css";
import { RootState, Task } from "../store";
import { Checkbox } from "../Checkbox";
import { connect } from "react-redux";
import { TASK_ACTIONS, TASK_STATUSES } from "../store";
import { Button } from "../Button";

interface ReduxStateProps {
  tasks: Task[];
  select: string;
}


interface ReduxDispatchProps {
  onChange: (v: number) => void;
  onClickTask: (v: number) => void;
}


const BaseTasks: React.FC<ReduxStateProps & ReduxDispatchProps> = ({
  tasks,
  select,
  onChange,
  onClickTask,
}) => {
  localStorage.setItem("TODOS", JSON.stringify(tasks))
  let selectTasks: Task[] = [];
  switch (select) {
    case TASK_STATUSES.TODO:
      selectTasks = tasks.filter((task) => !task.isChecked);
      break;
    case TASK_STATUSES.DONE:
      selectTasks = tasks.filter((task) => task.isChecked);
      break;
    default:
      selectTasks = tasks;
  }
  return (
    <ul className={css.list} >
      {selectTasks.map((task) => (
        <li key={task.id} className={css.listTask}>
          <Checkbox
            onChange={() => onChange(task.id)}
            checked={task.isChecked}
          />
          <span>{task.title}</span>
          <Button
            type="button"
            text="удалить"
            className={css.button}
            onClick={() => onClickTask(task.id)}
          />
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
    onClickTask: (taskId: number) =>
      dispatch({ type: TASK_ACTIONS.DELETE_TASK, taskId }),
  };
};

export const Tasks = connect(mapStateProps, mapDispathProps)(BaseTasks);
