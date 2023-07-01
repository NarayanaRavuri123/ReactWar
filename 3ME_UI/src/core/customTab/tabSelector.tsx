import "./customTab.css";
export const TabSelector = ({
  isActive,
  onClick,
  title,
  notificationCount,
  tabType,
  testId,
}: {
  isActive: boolean;
  title: string;
  notificationCount?: any;
  tabType?: any;
  onClick: () => void;
  testId?: string;
}) => (
  <button
    data-testid={testId}
    className={isActive ? "selected-tab-style" : "tab-style"}
    onClick={onClick}
  >
    {title + " "}
    {notificationCount && (
      <span
        className={`notification-count ${
          tabType === "Document"
            ? "notification-count"
            : tabType === "Wound"
            ? "notification-wounddetail-style"
            : ""
        }`}
      >
        <span className="notification-text-style"> {notificationCount}</span>
      </span>
    )}
  </button>
);
