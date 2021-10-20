import css from "./styles.module.css";

interface CheckboxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

export function Checkbox(props: CheckboxProps) {
  return (
    <div>
      <input
        className={css.checkbox}
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
      />
    </div>
  );
}
