import css from "./styles.module.css";
import { RootState, Task } from "../store";
import { TASK_STATUSES, LOAD_STATUSES } from "../store";
import { Checkbox } from "../Checkbox";
import { Button } from "../Button";
import { connect } from "react-redux";
import { getFilterState } from "../store/filterReduce";
import { getTasksState, tasksAction } from "../store/tasksReduce";

import { useEffect } from "react";
import { Loader } from "../Loader";
import { getLoadingState } from "../store/tasksReduce/selectors";

interface ReduxStateProps {
  todos: Task[];
  select: string;
  loadStatus: LOAD_STATUSES;
}

interface ReduxDispatchProps {
  onChange: (v: string, todos: Task[]) => void;
  onClickTask: (v: string) => void;
  fetchTodos: () => void;
}

const BaseTasks: React.FC<ReduxStateProps & ReduxDispatchProps> = ({
  todos,
  select,
  loadStatus,
  onChange,
  onClickTask,
  fetchTodos,
}) => {
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

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
  if (loadStatus === LOAD_STATUSES.LOADING) {
    return <Loader />;
  }
  if (loadStatus === LOAD_STATUSES.FAILURE) {
    return <div>"Ошибка, попробуйте позже"</div>;
  }
  return (
    <ul className={css.list}>
      {selectTasks.map((task) => (
        <li key={task.id} className={css.listTask}>
          <Checkbox
            onChange={() => onChange(task.id, todos)}
            checked={task.isDone}
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

const mapStateToProps = (state: RootState): ReduxStateProps => {
  return {
    todos: getTasksState(state),
    select: getFilterState(state),
    loadStatus: getLoadingState(state),
  };
};

const mapDispathToProps = {
  onChange: (id: string, todos: Task[]) => tasksAction.toggleTask(id, todos),
  onClickTask: (taskId: string) => tasksAction.deleteTask(taskId),
  fetchTodos: tasksAction.fetchTodos,
};

export const Tasks = connect(mapStateToProps, mapDispathToProps)(BaseTasks);
