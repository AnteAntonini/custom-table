import { Checkbox } from "../Checkbox/Checkbox";
import styles from "./tableHead.module.css";

export const TableHead = ({ toggleSelectAllWebsitesCheckbox }) => {
  return (
    <thead className={styles.tableHead}>
      <tr className={styles.tableHeadRow}>
        <th>
          <div className={styles.tableHeadItem}>
            <div className={styles.checkboxWrapper}>
              <Checkbox onChange={toggleSelectAllWebsitesCheckbox} />
            </div>
            <span>Website</span>
          </div>
        </th>

        <th>
          <span className={styles.tableHeadSeparator}></span>
          Sections
        </th>

        <th>
          <span className={styles.tableHeadSeparator}></span>
          Status
        </th>
      </tr>
    </thead>
  );
};
