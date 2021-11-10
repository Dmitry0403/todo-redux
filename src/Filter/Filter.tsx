import css from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getFilterState, filterSelect } from "../store/filterReduce";

export const Filter: React.FC = () => {
  const titles: string[] = ["all", "todo", "done"];
  const selected = useSelector(getFilterState);
  const dispatch = useDispatch();
  const onSelect = (payload: string) => dispatch(filterSelect(payload));

  return (
    <select className={css.filter} onChange={(e) => onSelect(e.target.value)}>
      {titles.map((item) => (
        <option key={item} value={item} selected={selected === item}>
          {item}
        </option>
      ))}
    </select>
  );
};
