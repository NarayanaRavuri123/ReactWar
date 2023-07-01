import React from "react";
import { ExpressButton } from "../expressButton/expressButton.component";
import { Popup } from "../popup/popup.component";
import "./errorPopup.css";
type Props = {
  popUpStyles: any;
  handleBackButton: any;
  errorPopupFlag: any;
  errorMessage: React.ReactNode;
};

const ErrorPopup = ({
  popUpStyles,
  handleBackButton,
  errorPopupFlag,
  errorMessage,
}: Props) => {
  return (
    <Popup
      openFlag={errorPopupFlag}
      dialogParentClass={popUpStyles}
      closeHandler={handleBackButton}
    >
      <div style={{ padding: "16px", display: "grid" }}>
        <div className="errorTitle">Error</div>
        <span className="errorDetail">{errorMessage}</span>
        <ExpressButton variant="contained" clickHandler={handleBackButton}>
          Back
        </ExpressButton>
      </div>
    </Popup>
  );
};

export default ErrorPopup;
