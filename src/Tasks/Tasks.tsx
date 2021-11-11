import css from "./styles.module.css";
import { Task } from "../store";
import { LOAD_STATUSES } from "../store";
import { Checkbox } from "../Checkbox";
import { Button } from "../Button";
import { useSelector, useDispatch } from "react-redux";
import { tasksAction } from "../store/tasksReduce";
import { useEffect } from "react";
import { Loader } from "../Loader";
import { getLoadingState, getTasks } from "../store/tasksReduce/selectors";

export const Tasks: React.FC = () => {
  const selectTasks = useSelector(getTasks);
  const loadStatus = useSelector(getLoadingState);
  const dispatch = useDispatch();
  const onChange = (id: string) => dispatch(tasksAction.toggleTask(id));
  const onClickTask = (taskId: string) =>
    dispatch(tasksAction.deleteTask(taskId));
  const fetchTodos = tasksAction.fetchTodos;

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch, fetchTodos]);

  if (loadStatus === LOAD_STATUSES.LOADING) {
    return <Loader />;
  }
  if (loadStatus === LOAD_STATUSES.FAILURE) {
    return <div>"Ошибка, попробуйте позже"</div>;
  }
  let tasks: Task[] = [];
  if (selectTasks) {
    tasks = selectTasks;
  }
  return (
    <ul className={css.list}>
      {tasks.map((task) => (
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
