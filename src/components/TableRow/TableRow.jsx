import React, { useEffect, useState } from "react";
import { Status } from "../Status";
import { WebsiteSection } from "../WebsiteSection";
import { ArrowIcon } from "../ArrowIcon";
import styles from "./tableRow.module.css";
import { Checkbox } from "../Checkbox/Checkbox";

export const TableRow = ({
  organization: { name, websites },
  websitesLength,
  isSelectAllWebsitesChecked,
}) => {
  const [isOrganizationExpanded, setIsOrganizationExpanded] = useState(false);
  const [expandedWebsites, setExpandedWebsites] = useState({});
  const [organizationCheckboxes, setOrganizationCheckboxes] = useState(
    Array(websitesLength).fill(false)
  );
  const [isIndeterminateSelection, setIsIndeterminateSelection] =
    useState(false);

  const toggleOrganizationRow = () => {
    setIsOrganizationExpanded(!isOrganizationExpanded);
  };

  const toggleWebsiteRow = (websiteId) => {
    setExpandedWebsites((prevExpandedWebsites) => ({
      ...prevExpandedWebsites,
      [websiteId]: !prevExpandedWebsites[websiteId],
    }));
  };

  const handleOrganizationCheckboxChange = (index) => {
    setOrganizationCheckboxes((prevCheckboxes) => {
      const newCheckboxes = [...prevCheckboxes];
      newCheckboxes[index] = !newCheckboxes[index];
      return newCheckboxes;
    });
  };

  useEffect(() => {
    setOrganizationCheckboxes(
      Array(websitesLength).fill(isSelectAllWebsitesChecked)
    );
  }, [isSelectAllWebsitesChecked, websitesLength]);

  return (
    <>
      <tr className={styles.tableRow}>
        <td className={styles.tableRowDefault} colSpan={3}>
          <div className={styles.tableDataContainer}>
            <span
              className={styles.tableRowArrow}
              onClick={toggleOrganizationRow}
            >
              <ArrowIcon isExpanded={isOrganizationExpanded} />
            </span>

            <span className={styles.tableRowName}>{name}</span>
          </div>
        </td>
      </tr>
      {isOrganizationExpanded && (
        <>
          {websites.map((website, index) => (
            <React.Fragment key={website.id}>
              <tr className={`${styles.websiteTableRow}`}>
                <td className={styles.tableRowExpanded}>
                  <div className={styles.tableRowInfo}>
                    <div className={styles.checkboxWrapper}>
                      <Checkbox
                        checked={
                          organizationCheckboxes[index] ||
                          (isSelectAllWebsitesChecked &&
                            organizationCheckboxes[index])
                        }
                        isIndeterminateSelection={isIndeterminateSelection}
                        onChange={() => {
                          handleOrganizationCheckboxChange(index);
                        }}
                      />
                    </div>

                    <span
                      className={`${styles.tableRowArrow} ${styles.tableRowExpandedArrow}`}
                      onClick={() => toggleWebsiteRow(website.id)}
                    >
                      <ArrowIcon isExpanded={expandedWebsites[website.id]} />
                    </span>
                    <div className={styles.websiteRowImage} />
                    <div className={styles.websiteName}>{website.name}</div>
                  </div>
                </td>
                <td className={styles.websiteSection}>
                  {website.sections.length}
                </td>
                <td>
                  <Status status={website.status} />
                </td>
              </tr>
              {expandedWebsites[website.id] && (
                <WebsiteSection
                  website={website}
                  isOrganizationCheckboxChecked={organizationCheckboxes[index]}
                  setIsIndeterminateSelection={setIsIndeterminateSelection}
                />
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};
