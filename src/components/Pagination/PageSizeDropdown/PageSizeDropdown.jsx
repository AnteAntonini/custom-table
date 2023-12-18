import styles from "./pageSizeDropdown.module.css";

const dropdownOptionPageSizes = ["25", "50", "100", "150"];

export const PageSizeDropdown = ({
  isOpen,
  toggleDropdown,
  currentPageSize,
  handleSelectChange,
  closeDropdown,
}) => {
  return (
    <div
      className={`${styles.pageSizeDropdown} ${isOpen ? styles.show : ""}`}
      onBlur={closeDropdown}
      tabIndex="0"
    >
      <div className={styles.selectedPageSize} onClick={toggleDropdown}>
        {currentPageSize}
        <img
          className={styles.arrow}
          src="src/assets/drop-arrow-down.svg"
          alt="dropdown arrow"
        />
      </div>
      <div className={styles.dropdownContent}>
        {dropdownOptionPageSizes.map((pageSize, index) => (
          <div
            key={index}
            className={`${styles.dropdownOption}`}
            onClick={() => handleSelectChange(pageSize)}
          >
            <span className={styles.dropdownItem}>{pageSize}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
