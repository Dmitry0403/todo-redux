import React from "react";
import css from "./styles.module.css";
import { connect } from "react-redux";
import type { RootState } from "../store";
import { TASK_ACTIONS } from "../store";
import { Button } from "../Button";

interface ReduxStateProps {
  value: string;
}

interface ReduxDispatchProps {
  inputChange: (value: string) => void;
  taskSubmit: (value: string) => void;
}

class InputBase extends React.Component<ReduxStateProps & ReduxDispatchProps> {
  render() {
    const { value, inputChange, taskSubmit } = this.props;
    return (
      <form onSubmit={(e) => {e.preventDefault(); taskSubmit(value)}}>
        <input
          className={css.input}
          type="text"
          placeholder="Введите задание"
          value={value}
          onChange={(e) => inputChange(e.target.value)}
        ></input>
        <Button className={css.input} type="submit" text="добавить" />
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
    taskSubmit: (payload: string) => {
      dispatch({ type: TASK_ACTIONS.ADD_TASK, payload });
    },
  };
};

export const Input = connect(mapStateProps, mapDispatchProps)(InputBase);
