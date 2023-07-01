import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
import "./cancellationConfirmationPopup.css";

interface Props {
  closeCancelOrderconfirmationPopup: Function;
  cancelReadyCareOrder: Function;
}

export const CancellationConfirmationPopup = ({
  closeCancelOrderconfirmationPopup,
  cancelReadyCareOrder,
}: Props) => {
  return (
    <div className="confirmationPopup">
      <div className="confirmationPopupContent">
        <div
          className="confirmationPopupTitle"
          data-testid="confirmationPopupTitleTest"
        >
          Are you sure you want to cancel this order?
        </div>
        <div className="confirmationPopupNoBtn">
          <ExpressButton
            parentClass="confirmationPopupOptBtnNo"
            variant="outlined"
            clickHandler={() => closeCancelOrderconfirmationPopup()}
            testId="do-not-cancel-Test"
          >
            No, Do Not Cancel
          </ExpressButton>
        </div>
        <div className="confirmationPopupYesBtn">
          <ExpressButton
            parentClass="confirmationPopupYesBtn"
            variant="contained"
            clickHandler={() => cancelReadyCareOrder()}
            testId="yes-cancel-Test"
          >
            Yes, Cancel Order
          </ExpressButton>
        </div>
      </div>
    </div>
  );
};
