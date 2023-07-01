import React from "react";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { Popup } from "../../../../core/popup/popup.component";
import "./sharedOrder.css";

interface Props {
  closePopUpAction: any;
  sharingStopped: boolean;
  cancelShareError: boolean;
  sharedByLoggedInUser: boolean;
}

export const SharedOrderStop = ({
  sharingStopped,
  closePopUpAction,
  cancelShareError,
  sharedByLoggedInUser,
}: Props) => {
  const handleClosePopup = () => {
    closePopUpAction(true);
  };

  const cancelShareOrderNote = () => {
    if (sharedByLoggedInUser) {
      return `Any edits others have made and saved will remain in the order. If you wish to share the order again, you can now do so.`;
    } else {
      return `Any edits you have made and saved will remain in the order. You can also re-add the order to your list using the Add Patient option from the My Patients dashboard.`;
    }
  };
  return (
    <Popup
      dialogParentClass="order-sharing-stop"
      closeHandler={handleClosePopup}
      openFlag={sharingStopped}
    >
      <div className="stopper-header" data-testid="stopper-header">
        {cancelShareError
          ? "Failed"
          : "Success! This order is no longer shared"}
      </div>
      <div className="stopper-desp" data-testid="stopper-desp">
        {cancelShareError ? "Something went wrong !!" : cancelShareOrderNote()}
      </div>
      <ExpressButton variant="contained" clickHandler={handleClosePopup}>
        Close
      </ExpressButton>
    </Popup>
  );
};
