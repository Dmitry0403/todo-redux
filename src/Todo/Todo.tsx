import { Tasks } from "../Tasks";
import { Input } from "../Input";
import { FilterList } from "../Filter";
import css from "./styles.module.css";


export const ToDo = () => {
  return (
    <div>
      <div className={css.sectionInput}>
        <h1>Список дел</h1>
        <Input />
        <FilterList />
      </div>
      <div className={css.sectionTasks}>
        <Tasks />
      </div>
    </div>
  );
};

