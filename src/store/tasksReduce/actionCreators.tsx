import { getTasksState } from "./selectors";
import { TASK_ACTIONS } from "../constans";
import { Task } from "../constans";
import { RootState } from "../store";

export const addTask = () => {
  return { type: TASK_ACTIONS.ADD_TASK };
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

export const fetchTodos = () => (dispatch: any) => {
  dispatch(getTodos());
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
};

export const addTodo = (payload: string) => async (dispatch: any) => {
  if (payload.trim()) {
    dispatch(addTask());
    try {
      const responce = await fetch("api/todos", {
        method: "POST",
        body: payload,
      });
      if (responce.ok) {
        dispatch(fetchTodos());
      } else throw new Error("ошибка");
    } catch (error) {
      dispatch(getTodosFailure());
    }
  }
};

export const toggleTask =
  (id: string) => async (dispatch: any, getState: () => RootState) => {
    const state = getState();
    const todos = getTasksState(state);
    const todo = todos.find((item) => item.id === id);
    let newTodo = {};
    if (todo) {
      newTodo = { ...todo, isDone: !todo.isDone };
    }
    try {
      const resp = await fetch(`api/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify(newTodo),
      });
      if (resp.ok) {
        dispatch(fetchTodos());
      } else throw new Error("ошибка");
    } catch (err) {
      dispatch(getTodosFailure());
    }
  };

export const deleteTask = (id: string) => async (dispatch: any) => {
  try {
    const resp = await fetch(`api/todos/${id}`, { method: "DELETE" });
    if (resp.ok) {
      dispatch(fetchTodos());
    } else throw new Error("ошибка");
  } catch (err) {
    dispatch(getTodosFailure());
  }
};
