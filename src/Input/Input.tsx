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
      <form onSubmit={(e) => taskSubmit(e)}>
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
    value: state.value.value,
  };
};

const mapDispathProps = (dispatch: any): ReduxDispatchProps => {
  return {
    inputChange: (payload: string) =>
      dispatch({ type: "changeValue" }, payload),
    taskSubmit: (e) => {
      dispatch({ type: "addTask" }, e);
    },
  };
};

export const Input = connect(mapStateProps, mapDispathProps)(InputBase);
