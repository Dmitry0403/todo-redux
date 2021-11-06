import css from "./styles.module.css";
import { connect } from "react-redux";
import { RootState } from "../store";
import { getFilterState } from "../store/filterReduce";
import { getFilterSelect } from "../store/filterReduce";

interface ReduxStateProps {
  selected: string;
}

interface ReduxDispatchProps {
  onSelect: (value: string) => void;
}

function BaseFilter(props: ReduxStateProps & ReduxDispatchProps) {
  const titles: string[] = ["all", "todo", "done"];
  const { selected, onSelect } = props;
  return (
    <select className={css.filter} onChange={(e) => onSelect(e.target.value)}>
      {titles.map((item) => (
        <option key={item} value={item} selected={selected === item}>
          {item}
        </option>
      ))}
    </select>
  );
}

const mapStateProps = (state: RootState): ReduxStateProps => {
  return {
    selected: getFilterState(state),
  };
};

const mapDispatchProps = (dispatch: any): ReduxDispatchProps => {
  return {
    onSelect: (payload: string) => dispatch(getFilterSelect(payload)),
  };
};

export const Filter = connect(mapStateProps, mapDispatchProps)(BaseFilter);
