import React from "react";
import css from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../Button";
import { getInputState, inputValue } from "../store/valueReduce";
import { tasksAction } from "../store/tasksReduce";

export const Input: React.FC = () => {
  const value = useSelector(getInputState);
  const dispatch = useDispatch();
  const inputChange = (payload: string) => dispatch(inputValue(payload));
  const taskSubmit = (payload: string) =>
    dispatch(tasksAction.addTodo(payload));

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
};
