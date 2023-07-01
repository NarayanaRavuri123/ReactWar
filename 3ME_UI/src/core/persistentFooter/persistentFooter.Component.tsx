import React from "react";
import "./persistentFooter.css";

type Props = {
  children: any;
};

export const PersistentFooter = ({ children }: Props) => {
  return (
    <div className="footer-btn-group" data-testid="footer-btn-group">
      {children}
    </div>
  );
};
