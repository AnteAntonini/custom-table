import styles from "./checkbox.module.css";

export const Checkbox = ({
  checked,
  onChange,
  isIndeterminateSelection = false,
}) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={checked}
          onChange={onChange}
        />
        <span
          className={`${styles.customCheckbox} ${
            isIndeterminateSelection ? styles.indeterminate : styles.active
          } `}
        />
      </label>
    </div>
  );
};
