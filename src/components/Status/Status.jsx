import { STATUS } from "../../constants/status";
import styles from "./status.module.css";

export const Status = ({ status = 0, hideInfo = false, tooltip = false }) => {
  return (
    <div className={styles.websiteStatus}>
      <div className={styles.statusIndicator}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <g clipPath="url(#clip0_8888_5054)">
            <circle cx="8" cy="8" r="4" fill={`${STATUS[status].color}`} />
          </g>
          <defs>
            <clipPath id="clip0_8888_5054">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>

        {tooltip && (
          <div className={styles.tooltipContainer}>
            <p className={styles.tooltipText}>{STATUS[status].info}</p>
          </div>
        )}
      </div>
      {!hideInfo && (
        <p className={styles.websiteStatusInfo}>{STATUS[status].info}</p>
      )}
    </div>
  );
};
