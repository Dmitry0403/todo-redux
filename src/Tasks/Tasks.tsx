import css from "./styles.module.css";
import { RootState, Task, TASK_STATUSES } from "../store";
import { Checkbox } from "../Checkbox";
import { Button } from "../Button";
import { connect } from "react-redux";
import { getFilterState } from "../store/filterReduce";
import { getTasksState, tasksAction } from "../store/tasksReduce";

import { useEffect } from "react";

interface ReduxStateProps {
  todos: Task[];
  select: string;
}

interface ReduxDispatchProps {
  onChange: (v: string) => void;
  onClickTask: (v: string) => void;
  fetchTodos: () => void;
}

const BaseTasks: React.FC<ReduxStateProps & ReduxDispatchProps> = ({
  todos,
  select,
  onChange,
  onClickTask,
  fetchTodos,
}) => {

  useEffect(() => {
    fetchTodos();
  },[]);

  let selectTasks: Task[] = [];
  switch (select) {
    case TASK_STATUSES.TODO:
      selectTasks = todos.filter((task) => !task.isDone);
      break;
    case TASK_STATUSES.DONE:
      selectTasks = todos.filter((task) => task.isDone);
      break;
    default:
      selectTasks = todos;
  }
  return (
    <ul className={css.list}>
      {selectTasks.map((task) => (
        <li key={task.id} className={css.listTask}>
          <Checkbox onChange={() => onChange(task.id)} checked={task.isDone} />
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

const mapStateToProps = (state: RootState): ReduxStateProps => {
  return {
    todos: getTasksState(state),
    select: getFilterState(state),
  };
};

const mapDispathToProps = {
  onChange: (id: string) => tasksAction.doneTask(id),
  onClickTask: (taskId: string) => tasksAction.deleteTask(taskId),
  fetchTodos: tasksAction.fetchTodos,
};

export const Tasks = connect(mapStateToProps, mapDispathToProps)(BaseTasks);
