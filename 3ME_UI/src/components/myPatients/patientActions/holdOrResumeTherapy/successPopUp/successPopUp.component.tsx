import "./successPopUp.css";
import { ISuccessPopUp } from "./successPopUp.interface";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";

export const SuccessPopUp = ({
  title,
  description1,
  description2,
  buttonTitle,
  btnAction,
}: ISuccessPopUp) => {
  return (
    <div className="success-pop-up" data-testid="success-pop-up">
      <h4 className="success-pop-up-title" data-testid="success-pop-up-title">
        {title}
      </h4>
      <div
        className="success-pop-up-description"
        data-testid="success-pop-up-description"
      >
        <h5
          className="success-pop-up-description1"
          data-testid="success-pop-up-description1"
        >
          {description1}
        </h5>
        {description2 !== "" && (
          <h5
            className="success-pop-up-description2"
            data-testid="success-pop-up-description2"
          >
            {description2}
          </h5>
        )}
      </div>
      <ExpressButton
        clickHandler={btnAction}
        parentClass="submitButton"
        testId="buttonTitle"
        variant="contained"
      >
        {buttonTitle}
      </ExpressButton>
    </div>
  );
};
