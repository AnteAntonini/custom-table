import React, { useState } from "react";
import styles from "./App.module.css";

import { TableHead } from "./components/TableHead";
import { TableRow } from "./components/TableRow";
import { Pagination } from "./components/Pagination";
import { useFetch } from "./hooks/useFetch";

const TableComponent = () => {
  const [pageSize, setPageSize] = useState(25);
  const [page, setPage] = useState(1);

  const data = useFetch(
    `https://demo-api.dotmetrics.net/v1/public/organizations/list?pageSize=${pageSize}&page=${page}`
  );

  const [isSelectAllWebsitesChecked, setIsSelectAllWebsitesChecked] =
    useState(false);

  const toggleSelectAllWebsitesCheckbox = () => {
    setIsSelectAllWebsitesChecked(!isSelectAllWebsitesChecked);
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <TableHead
            toggleSelectAllWebsitesCheckbox={toggleSelectAllWebsitesCheckbox}
          />
          <tbody>
            {data?.result &&
              data.result.map((organization, index) => (
                <TableRow
                  key={organization.id}
                  organization={organization}
                  websitesLength={data.result.length}
                  isSelectAllWebsitesChecked={isSelectAllWebsitesChecked}
                />
              ))}
          </tbody>
        </table>
      </div>
      <div className={styles.paginationWrapper}>
        <Pagination
          totalCount={data?.totalCount}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
};

export default TableComponent;
