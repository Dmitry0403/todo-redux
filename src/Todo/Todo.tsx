import React from "react";
import { Tasks } from "../Tasks/Tasks";
import { Input } from "../Input/Input";
import { FilterList } from "../Filter/Filter";
import css from "./styles.module.css";
import { TASK_STATUSES, Task } from "../types";


interface StateTask {
  value: string;
  tasks: Task[];
  isFilter: boolean;
  select: string;
}

export class ToDo extends React.Component<{}, StateTask> {
  state: StateTask = {
    value: "",
    tasks: [],
    isFilter: false,
    select: TASK_STATUSES.ALL,
  };

  handleChange = (value: string) => {
    this.setState({ value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { value } = this.state;
    if (value.trim()) {
      this.setState((prevState) => ({
        tasks: prevState.tasks.concat([
          { title: value, isChecked: false, id: Date.now() },
        ]),
        value: "",
      }));
      e.preventDefault();
    }
  };

  handleCheckbox = (id: number) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => {
        if (task.id === id) {
          return {...task, isChecked: !task.isChecked} 
        }
        return task
      }),
    }));
  };

  handleFilterChange = () => {
    this.setState((prevProps) => ({
      isFilter: !prevProps.isFilter,
    }));
  };

  handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const select = e.target.value;
    this.setState({
      select,
    });
  };
  render() {
    const { tasks, select, value, isFilter } = this.state;
    let selectTasks: Task[] = [];
    if (select === TASK_STATUSES.ALL) {
      selectTasks = tasks;
    } else if (select === TASK_STATUSES.TODO) {
      selectTasks = tasks.filter((task) => !task.isChecked);
    } else if (select === TASK_STATUSES.DONE) {
      selectTasks = tasks.filter((task) => task.isChecked);
    }
    return (
      <div>
        <div className={css.sectionInput}>
          <h1>Список дел</h1>
          <Input
            value={value}
            taskChange={this.handleChange}
            taskSubmit={this.handleSubmit}
          />
          <FilterList
            isFilter={isFilter}
            onChange={this.handleFilterChange}
            onSelect={this.handleSelect}
            selected={select}
          />
        </div>
        <div className={css.sectionTasks}>
          <Tasks tasks={selectTasks} onChange={this.handleCheckbox} />
        </div>
      </div>
    );
  }
}
