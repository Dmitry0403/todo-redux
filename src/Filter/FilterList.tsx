import css from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox } from "../Checkbox";
import { Filter } from "./Filter";
import { getIsFilterState, filterCheck } from "../store/isFilterReduce";

export function FilterList() {
  const isFilter = useSelector(getIsFilterState);
  const dispatch = useDispatch();
  const onChange = () => dispatch(filterCheck());
  return (
    <div>
      <div className={css.filterList}>
        <legend>Фильтр дел</legend>
        <Checkbox onChange={onChange} />
      </div>
      {isFilter && (
        <div>
          <Filter />
        </div>
      )}
    </div>
  );
}
