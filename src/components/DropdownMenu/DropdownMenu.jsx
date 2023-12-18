import { forwardRef } from "react";
import styles from "./dropdownMenu.module.css";

export const DropdownMenu = forwardRef(
  ({ isDropdownVisible, dropdownMenuLabel, dropdownMenuContent }, ref) => {
    return (
      <>
        {isDropdownVisible && (
          <div className={styles.dropdownMenu} ref={ref}>
            <div className={styles.dropdownMenuLabel}>{dropdownMenuLabel}</div>
            {dropdownMenuContent?.map((menuItem, index) => (
              <div
                key={menuItem.id}
                className={`${styles.dropdownMenuItem} ${
                  index === dropdownMenuContent.length - 1 &&
                  styles.menuLastItem
                }`}
              >
                {menuItem.label}
              </div>
            ))}
          </div>
        )}
      </>
    );
  }
);
