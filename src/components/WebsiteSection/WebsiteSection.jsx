import { useEffect, useRef, useState } from "react";
import { Status } from "../Status";
import { DropdownMenu } from "../DropdownMenu";
import styles from "./websiteSection.module.css";
import { Checkbox } from "../Checkbox/Checkbox";

const dropdownMenuLabel = "generate tags as";
const dropdownMenuContent = [
  {
    id: 1,
    label: "Numberic ID",
  },
  {
    id: 2,
    label: "Amp Code",
  },
  {
    id: 3,
    label: "String Code",
  },
];

export const WebsiteSection = ({
  website,
  isOrganizationCheckboxChecked,
  setIsIndeterminateSelection,
}) => {
  const [visibleDropdown, setVisibleDropdown] = useState({});
  const dropdownRef = useRef(null);
  const [sectionCheckboxes, setSectionCheckboxes] = useState(
    Array(website.sections.length).fill(false)
  );

  const atLeastOneTrue = sectionCheckboxes.some(function (value) {
    return value === true;
  });
  const notAllTrue = sectionCheckboxes.some(function (value) {
    return value === false;
  });

  useEffect(() => {
    const isIndeterminateSelection = atLeastOneTrue && notAllTrue;
    setIsIndeterminateSelection(isIndeterminateSelection);
  }, [atLeastOneTrue, notAllTrue, setIsIndeterminateSelection]);

  const toggleDropdownMenu = (sectionId) => {
    setVisibleDropdown((prevVisibleDropdown) =>
      prevVisibleDropdown === sectionId ? null : sectionId
    );
  };

  const handleSectionCheckboxChange = (index) => {
    setSectionCheckboxes((prevCheckboxes) => {
      const newCheckboxes = [...prevCheckboxes];
      newCheckboxes[index] = !newCheckboxes[index];
      return newCheckboxes;
    });
  };

  useEffect(() => {
    setSectionCheckboxes(
      Array(website.sections.length).fill(isOrganizationCheckboxChecked)
    );
  }, [isOrganizationCheckboxChecked, website.sections.length]);

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.classList.contains(styles.moreIcon)
    ) {
      setVisibleDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <tr className={styles.websiteSectionTitleRow}>
      <td colSpan="3">
        <div className={styles.websiteSectionTitle}>Website Sections</div>
        <div className={styles.innerTable}>
          {website.sections.map((section, index) => (
            <div className={styles.websiteSectionData} key={section.id}>
              <div className={`${styles.websiteSectionDataRow}`}>
                <div className={styles.websiteSectionDataInfo}>
                  <div className={styles.checkboxWrapper}>
                    <Checkbox
                      checked={
                        sectionCheckboxes[index] ||
                        (isOrganizationCheckboxChecked &&
                          sectionCheckboxes[index])
                      }
                      onChange={() => handleSectionCheckboxChange(index)}
                    />
                  </div>
                  <span className={styles.websiteSectionName}>
                    {section.name}
                  </span>
                </div>
                <div className={styles.websiteSectionDataAction}>
                  <Status hideInfo status={section.status} tooltip />
                  <img
                    src="src/assets/more-icon.svg"
                    alt="More icon"
                    className={styles.moreIcon}
                    onClick={() => toggleDropdownMenu(section.id)}
                  />

                  <DropdownMenu
                    dropdownMenuLabel={dropdownMenuLabel}
                    dropdownMenuContent={dropdownMenuContent}
                    isDropdownVisible={visibleDropdown === section.id}
                    ref={dropdownRef}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </td>
    </tr>
  );
};
