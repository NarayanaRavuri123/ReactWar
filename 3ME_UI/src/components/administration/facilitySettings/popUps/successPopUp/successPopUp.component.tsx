import "./successPopUp.css";
import { ISuccessPopUp } from "./successPopUp.interface";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";

export const SuccessPopUp = ({
  buttonAction,
  buttonTitle,
  description,
  title,
}: ISuccessPopUp) => {
  return (
    <div className="facility-settings-success">
      <h2 className="title" data-testid="title">
        {title}
      </h2>
      <h4 className="description" data-testid="description">
        <span className="success-text">Success! </span>
        {description}
      </h4>
      <ExpressButton
        clickHandler={() => {
          buttonAction();
        }}
        parentClass="back-button"
        testId="buttonTitle"
        variant="contained"
      >
        {buttonTitle}
      </ExpressButton>
    </div>
  );
};
