import { useState } from "react";
import { PageSizeDropdown } from "./PageSizeDropdown";
import styles from "./pagination.module.css";

export function Pagination({
  totalCount,
  page,
  pageSize,
  setPage,
  setPageSize,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePageSizeChange = (value) => {
    if (value > totalCount) return;

    const totalPages = Math.ceil(totalCount / value);
    const newPage = Math.min(page, totalPages);

    setPageSize(value);

    setPage(newPage);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handlePageChange = (nextPage) => {
    const hasAdditionalPages = nextPage * pageSize - totalCount < pageSize;
    if (nextPage > 0 && hasAdditionalPages) setPage(nextPage);
  };

  return (
    <tr>
      <td className={styles.pagination} colSpan="3">
        <div className={styles.paginationWrapper}>
          <span className={styles.rowsText}>Show rows:</span>

          <PageSizeDropdown
            isOpen={isOpen}
            currentPageSize={pageSize}
            handleSelectChange={handlePageSizeChange}
            toggleDropdown={toggleDropdown}
            closeDropdown={closeDropdown}
          />

          <span className={styles.separator} />
          <span className={styles.paginationPages}>
            {page} - {pageSize} of {totalCount}
          </span>

          <img
            className={styles.changePageArrow}
            src="src/assets/arrow-left-solid.svg"
            alt="arrow left"
            onClick={() => handlePageChange(page - 1)}
          />
          <span className={`${styles.separator} ${styles.small}`} />
          <img
            className={styles.changePageArrow}
            src="src/assets/arrow-right-solid.svg"
            alt="arrow right"
            onClick={() => handlePageChange(page + 1)}
          />
        </div>
      </td>
    </tr>
  );
}
