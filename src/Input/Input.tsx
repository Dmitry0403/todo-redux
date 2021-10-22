import React from "react";
import css from "./styles.module.css";
import { connect } from "react-redux";
import type { RootState } from "../store";

interface ReduxStateProps {
  value: string;
}

interface ReduxDispatchProps {
  inputChange: (value: string) => void;
  taskSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

class InputBase extends React.Component<ReduxStateProps & ReduxDispatchProps> {
  render() {
    const { value, inputChange, taskSubmit } = this.props;
    return (
      <form onSubmit={taskSubmit}>
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

const mapDispathProps = (dispatch: any): ReduxDispatchProps => {
  return {
    inputChange: (payload: string) =>
      dispatch({ type: "changeValue" }, payload),
    taskSubmit: (e) => {
      e.preventDefault();
      dispatch({ type: "addTask" });
    },
  };
};

export const Input = connect(mapStateProps, mapDispathProps)(InputBase);
