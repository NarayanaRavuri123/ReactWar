import React from "react";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { Popup } from "../../../core/popup/popup.component";
import "./newOrderFooterBtnGroup.css";

type Props = {
  popUpStyles: any;
  handleBackButton: any;
  errorPopupFlag: any;
  errorMessage: React.ReactNode;
  isSaveExitFlow?: boolean;
  handleExitButton: any;
};

const NewOrderErrorPopupMessage = ({
  popUpStyles,
  handleBackButton,
  errorPopupFlag,
  errorMessage,
  isSaveExitFlow,
  handleExitButton,
}: Props) => {
  return (
    <Popup
      openFlag={errorPopupFlag}
      dialogParentClass="popUpStyles"
      closeHandler={handleBackButton}
    >
      <div className="deleteOrderPopup">
        <div className="deleteOrderPopupContent">
          <div className="errorTitle">Error</div>
          <span className="errorDetail">{errorMessage}</span>
          <div className="deleteOrderDNoBtn">
            <ExpressButton
              variant="outlined"
              clickHandler={handleBackButton}
              parentClass="deleteOrderDNoBtn"
            >
              Back
            </ExpressButton>
          </div>
          {isSaveExitFlow && (
            <div className="deleteOrderDYesBtn">
              <ExpressButton
                parentClass="deleteOrderDYesBtn"
                variant="contained"
                clickHandler={() => handleExitButton()}
                testId="DeleteOrderTest"
              >
                Exit
              </ExpressButton>
            </div>
          )}
        </div>
      </div>
    </Popup>
  );
};

export default NewOrderErrorPopupMessage;
