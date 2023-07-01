import "./sendNoteFailure.css";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { ISendNoteFailureProps } from "./sendNoteFailure.interface";

export const SendNoteFailure = ({
  rootClass = null,
  message,
  backButtonAction,
}: ISendNoteFailureProps) => {
  return (
    <div className={rootClass ?? "failure-pop-up"}>
      <h4 className="failure-pop-up-description" data-testid="description">
        {message}
      </h4>
      <ExpressButton
        clickHandler={() => {
          backButtonAction();
        }}
        parentClass="failure-pop-up-back-button"
        testId="back-button"
        variant="contained"
      >
        Done
      </ExpressButton>
    </div>
  );
};
