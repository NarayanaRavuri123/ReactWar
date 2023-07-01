import React from "react";
import "./alertPopup.css";

type Props = { titleClassName: string; title: string; children: any };

const AlertPopup = ({ titleClassName, title, children }: Props) => {
  return (
    <div className="alert-detail">
      <div className="alert-header">
        <h5 className={titleClassName} data-testid={titleClassName}>
          {title}
        </h5>
      </div>
      {children}
    </div>
  );
};

export default AlertPopup;
