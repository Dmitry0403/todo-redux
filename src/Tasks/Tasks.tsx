import css from "./styles.module.css";
import { Task } from "../store";
import { TASK_STATUSES, LOAD_STATUSES } from "../store";
import { Checkbox } from "../Checkbox";
import { Button } from "../Button";
import { useSelector, useDispatch } from "react-redux";
import { getFilterState } from "../store/filterReduce";
import {
  getTasksState,
  getDoneTasks,
  getTodoTasks,
  tasksAction,
} from "../store/tasksReduce";
import { useEffect } from "react";
import { Loader } from "../Loader";
import { getLoadingState } from "../store/tasksReduce/selectors";

export const Tasks: React.FC = () => {
  const todos = useSelector(getTasksState);
  const todo = useSelector(getTodoTasks);
  const done = useSelector(getDoneTasks);
  const select = useSelector(getFilterState);
  const loadStatus = useSelector(getLoadingState);
  const dispatch = useDispatch();
  const onChange = (id: string) => dispatch(tasksAction.toggleTask(id));
  const onClickTask = (taskId: string) =>
    dispatch(tasksAction.deleteTask(taskId));
  const fetchTodos = () => dispatch(tasksAction.fetchTodos());

  useEffect(() => {
    fetchTodos();
  }, []);

  let selectTasks: Task[] = [];
  switch (select) {
    case TASK_STATUSES.TODO:
      selectTasks = todo;
      break;
    case TASK_STATUSES.DONE:
      selectTasks = done;
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
