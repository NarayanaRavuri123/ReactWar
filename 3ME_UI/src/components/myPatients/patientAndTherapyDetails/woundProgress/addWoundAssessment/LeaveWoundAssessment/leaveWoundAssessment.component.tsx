import React from "react";
import { WoundAssessmentContextType } from "../../../../../../context/WoundAssessmentContext";
import { ExpressButton } from "../../../../../../core/expressButton/expressButton.component";
import { Popup } from "../../../../../../core/popup/popup.component";
import "./leaveWoundAssessment.css";

type ILeaveWoundAssessmentProps = {
  title: string;
  buttonTitle: string;
  handleCancelLeavePopUp: any;
  cancelLeaveOpen: any;
  cancelConfirmText: string;
  backBtnText: string;
  WoundAssessmentObj: WoundAssessmentContextType | null;
  handlePageChange: React.MouseEventHandler<HTMLButtonElement>;
};
export const LeaveWoundAssessment = ({
  title,
  buttonTitle,
  handleCancelLeavePopUp,
  cancelLeaveOpen,
  cancelConfirmText,
  backBtnText,
  handlePageChange,
}: ILeaveWoundAssessmentProps) => {
  return (
    <Popup
      closeHandler={handleCancelLeavePopUp}
      openFlag={cancelLeaveOpen}
      dialogParentClass="leaveAssessmentPopup"
      data-testid="leave-Assessment-Popup"
    >
      <span
        data-testid="cancelConfirmAssessmentText"
        className="cancelConfirmAssessmentText"
      >
        {title}
      </span>
      <span
        data-testid="cancelConfirmationTextDesc"
        className="cancelConfirmationTextDesc"
      >
        {cancelConfirmText}
      </span>

      <ExpressButton
        testId="backButton"
        variant="outlined"
        clickHandler={handleCancelLeavePopUp}
        parentClass="backAssessmentButton"
      >
        {backBtnText}
      </ExpressButton>
      <ExpressButton
        variant="contained"
        clickHandler={handlePageChange}
        parentClass="cancelAssessmentBtn"
        testId="leaveButton"
      >
        {buttonTitle}
      </ExpressButton>
    </Popup>
  );
};
