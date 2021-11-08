import React from "react";
import css from "./styles.module.css";
import { connect } from "react-redux";
import { RootState } from "../store";
import { Button } from "../Button";
import { getInputState, inputValue } from "../store/valueReduce";
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

const mapDispatchProps = {
  inputChange: (payload: string) => inputValue(payload),
  taskSubmit: (payload: string) => tasksAction.addTask(payload),
};

export const Input = connect(mapStateProps, mapDispatchProps)(InputBase);
