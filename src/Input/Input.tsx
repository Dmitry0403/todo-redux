import React from "react";
import css from "./styles.module.css";
import { connect } from "react-redux";
import type { RootState } from "../store";
import { Button } from "../Button";
import { getInputState } from "../store/valueReduce";
import { getInputValue } from "../store/valueReduce";
import { tasksAction } from "../store/tasksReduce";

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          taskSubmit(value);
        }}
      >
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
    value: getInputState(state),
  };
};

const mapDispatchProps = (dispatch: any): ReduxDispatchProps => {
  return {
    inputChange: (payload: string) => dispatch(getInputValue(payload)),
    taskSubmit: (payload: string) => {
      dispatch(tasksAction.getAddTask(payload));
    },
  };
};

export const Input = connect(mapStateProps, mapDispatchProps)(InputBase);
