import "./sendNoteCancelPopUp.css";
import { ISendNoteCancelProps } from "./sendNoteCancelPopUp.interface";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";

export const SendNoteCancel = ({
  backButtonAction,
  closeButtonAction,
}: ISendNoteCancelProps) => {
  return (
    <div className="cancel-pop-up">
      <h2 className="title" data-testid="title">
        Are you sure you want to leave?
      </h2>
      <h4 className="description" data-testid="description">
        All changes will be lost
      </h4>
      <ExpressButton
        clickHandler={() => {
          closeButtonAction();
        }}
        parentClass="back-button"
        testId="back-button"
        variant="outlined"
      >
        Back
      </ExpressButton>
      <ExpressButton
        clickHandler={() => {
          backButtonAction();
        }}
        parentClass="leave-button"
        testId="leave-button"
        variant="contained"
      >
        Leave
      </ExpressButton>
    </div>
  );
};
