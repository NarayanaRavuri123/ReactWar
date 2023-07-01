import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import "./exitDischargePopUp.css";
import { IExitDischargePopUp } from "./exitDischargePopUp.interface";

export const ExitDischargePopUp = ({
  cancelBtnAction,
  returnBtnAction,
}: IExitDischargePopUp) => {
  return (
    <div className="exit-discharge-pop-up">
      <h4
        className="exit-discharge-pop-up-title"
        data-testid="exit-discharge-pop-up-title"
      >
        Exit discharge completion
      </h4>
      <h5
        className="exit-discharge-pop-up-description"
        data-testid="exit-discharge-pop-up-description"
      >
        You are about to exit this discharge order. Any changes on this screen
        will be lost. Click “Cancel” to proceed or click “Return” to return to
        the order.
      </h5>
      <div
        className="exit-discharge-pop-up-footer"
        data-testid="exit-discharge-pop-up-footer"
      >
        <ExpressButton
          clickHandler={cancelBtnAction}
          parentClass="cancel-exit-discharge-request"
          testId="cancel-exit-discharge-request"
          variant="outlined"
        >
          Cancel
        </ExpressButton>
        <ExpressButton
          clickHandler={returnBtnAction}
          parentClass="return-exit-discharge-request"
          testId="return-exit-discharge-request"
          variant="contained"
        >
          Return
        </ExpressButton>
      </div>
    </div>
  );
};
