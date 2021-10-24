import css from "./styles.module.css";
import { connect } from "react-redux";
import { RootState } from "../store";
import { Checkbox } from "../Checkbox";
import { Filter } from "./Filter";
import { TASK_ACTIONS } from "../store";

interface ReduxStateProps {
  isFilter: boolean;
}

interface ReduxDispatchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function BaseFilterList(props: ReduxStateProps & ReduxDispatchProps) {
  const { isFilter, onChange } = props;
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

const mapStateProps = (state: RootState): ReduxStateProps => {
  return {
    isFilter: state.isFilterState.isFilter,
  };
};

const mapDispatchProps = (dispatch: any): ReduxDispatchProps => {
  return {
    onChange: () => dispatch({ type: TASK_ACTIONS.IS_FILTER }),
  };
};

export const FilterList = connect(
  mapStateProps,
  mapDispatchProps
)(BaseFilterList);
