import "./sendNoteSuccess.css";
import { ISendNoteSuccessProps } from "./sendNoteSuccess.inteface";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";

export const SendNoteSuccess = ({
  backButtonAction,
}: ISendNoteSuccessProps) => {
  return (
    <div className="success-pop-up">
      <h2 className="title" data-testid="title">
        Note Confirmation
      </h2>
      <h4 className="description" data-testid="description">
        Thank you for submitting your request or comment. Requests and comments
        are processed Monday through Friday (except for Holidays) from 7 a.m. to
        7 p.m. CST.
      </h4>
      <ExpressButton
        clickHandler={() => {
          backButtonAction();
        }}
        parentClass="back-button"
        testId="back-button"
        variant="contained"
      >
        Back to Dashboard
      </ExpressButton>
    </div>
  );
};
