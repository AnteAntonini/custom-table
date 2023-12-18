import React, { useState, useRef } from "react";
import styles from "./App.module.css";

import { TableHead } from "./components/TableHead";
import { TableRow } from "./components/TableRow";
import { Pagination } from "./components/Pagination";
import { useFetch } from "./hooks/useFetch";

const TableComponent = () => {
  const [pageSize, setPageSize] = useState(25);
  const [page, setPage] = useState(1);

  const tableRef = useRef(null);

  const data = useFetch(
    `https://demo-api.dotmetrics.net/v1/public/organizations/list?pageSize=${pageSize}&page=${page}`
  );

  const [isSelectAllWebsitesChecked, setIsSelectAllWebsitesChecked] =
    useState(false);

  const toggleSelectAllWebsitesCheckbox = () => {
    setIsSelectAllWebsitesChecked(!isSelectAllWebsitesChecked);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <TableHead
          toggleSelectAllWebsitesCheckbox={toggleSelectAllWebsitesCheckbox}
        />
        <tbody ref={tableRef}>
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
        <tfoot>
          <Pagination
            totalCount={data?.totalCount}
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
          />
        </tfoot>
      </table>
    </div>
  );
};

export default TableComponent;
