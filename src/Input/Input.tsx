import React from "react";
import css from "./styles.module.css";
import { connect } from "react-redux";
import type { RootState } from "../store";
import { TASK_ACTIONS } from "../store";

interface ReduxStateProps {
  value: string;
}

interface ReduxDispatchProps {
  inputChange: (value: string) => void;
  taskSubmit: (e: React.FormEvent<HTMLFormElement>, value: string) => void;
}

class InputBase extends React.Component<ReduxStateProps & ReduxDispatchProps> {
  render() {
    const { value, inputChange, taskSubmit } = this.props;
    return (
      <form onSubmit={(e) => taskSubmit(e, value)}>
        <input
          className={css.input}
          type="text"
          placeholder="Введите задание"
          value={value}
          onChange={(e) => inputChange(e.target.value)}
        ></input>
        <button className={css.input} type="submit">
          добавить
        </button>
      </form>
    );
  }
}

const mapStateProps = (state: RootState): ReduxStateProps => {
  return {
    value: state.inputState.value,
  };
};

const mapDispatchProps = (dispatch: any): ReduxDispatchProps => {
  return {
    inputChange: (payload: string) =>
      dispatch({ type: TASK_ACTIONS.CHANGE_VALUE, payload }),
    taskSubmit: (e, payload: string) => {
      e.preventDefault();
      dispatch({ type: TASK_ACTIONS.ADD_TASK, payload });
    },
  };
};

export const Input = connect(mapStateProps, mapDispatchProps)(InputBase);
