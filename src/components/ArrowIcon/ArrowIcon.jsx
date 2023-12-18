import styles from "./arrowIcon.module.css";

export const ArrowIcon = ({ isExpanded }) => {
  const className = isExpanded ? styles.arrowDown : "";
  const fillColor = isExpanded ? "#0068ed" : "#9EA0A5";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`${styles.arrowIcon} ${className}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.00168 4L11.0017 8.07429L6 12L6.00168 4Z"
        fill={fillColor}
      />
    </svg>
  );
};
