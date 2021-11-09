import { TASK_ACTIONS } from "../constans";
import { Task } from "../constans";

export const addTask = (payload: string) => {
  return { type: TASK_ACTIONS.ADD_TASK, payload };
};

export const doneTask = (id: string) => {
  return { type: TASK_ACTIONS.DONE_TASK, id };
};

export const deleteTask = (taskId: string) => {
  return { type: TASK_ACTIONS.DELETE_TASK, taskId };
};

export const getTodos = () => ({
  type: TASK_ACTIONS.GET_TODOS,
});

export const getTodosSuccess = (todos: Task[]) => ({
  type: TASK_ACTIONS.GET_TODOS_SUCCESS,
  todos,
});

export const getTodosFailure = () => ({
  type: TASK_ACTIONS.GET_TODOS_FAILURE,
});

export const fetchTodos = () => async (dispatch: any) => {
  dispatch(getTodos());
  try {
    fetch("api/todos")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("ошибка");
      })
      .then(({ todos }) => {
        dispatch(getTodosSuccess(todos));
      })
      .catch(() => {
        dispatch(getTodosFailure());
      });
  } catch {
    dispatch(getTodosFailure());
  }
};
