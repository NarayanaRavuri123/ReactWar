import React from "react";
import "./missingRxUploadSuccess.css";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
interface Props {
  closePopUpAction: Function;
}

export const MissingRxUploadSuccess = ({ closePopUpAction }: Props) => {
  return (
    <div className="successRxUpload">
      <div className="successTextLight">
        <span className="successText">Success!</span> The prescription has been
        uploaded & will be reviewed.
      </div>
      <div
        className="successRxUploadDoneBtn"
        data-testid="successRxUploadDoneBtn"
      >
        <ExpressButton
          parentClass="successRxUploadBtn"
          variant="contained"
          clickHandler={() => closePopUpAction()}
        >
          Done
        </ExpressButton>
      </div>
    </div>
  );
};
