import { TASK_ACTIONS } from "../constans";
import { Task } from "../constans";

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

export const addTodo = (payload: string) => (dispatch: any) => {
  if (payload.trim()) {
    dispatch(addTask());
    dispatch(getTodos());
    try {
      fetch("api/todos", { method: "POST", body: JSON.stringify(payload) })
        .then((resp) => {
          if (resp.ok) {
            dispatch(fetchTodos());
          }
          throw new Error("ошибка");
        })
        .catch(() => dispatch(getTodosFailure));
    } catch {
      dispatch(getTodosFailure());
    }
  }
};

export const toggleTask = (id: string, todos: Task[]) => (dispatch: any) => {
  dispatch(getTodos());
  const todo = todos.find((item) => item.id === id);
  let newTask = {};
  if (todo) {
    newTask = { ...todo, isDone: !todo.isDone };
  }
  try {
    fetch(`api/todos/${id}`, { method: "PATCH", body: JSON.stringify(newTask) })
      .then((resp) => {
        if (resp.ok) {
          dispatch(fetchTodos());
        }
        throw new Error("ошибка");
      })
      .catch(() => dispatch(getTodosFailure));
  } catch {
    dispatch(getTodosFailure());
  }
};

export const deleteTask = (id: string) => (dispatch: any) => {
  dispatch(getTodos());
  try {
    fetch(`api/todos/${id}`, { method: "DELETE" })
      .then((resp) => {
        if (resp.ok) {
          dispatch(fetchTodos());
        }
        throw new Error("ошибка");
      })
      .catch(() => dispatch(getTodosFailure));
  } catch {
    dispatch(getTodosFailure());
  }
};
