import React from "react";
import "./missingRxUploadFail.css";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
import { MissingRxSection } from "../missingRx.enum";
interface Props {
  errorMessage?: string;
  changePopUpSection: (newSection: MissingRxSection) => void;
}

export const MissingRxUploadFail = ({
  changePopUpSection,
  errorMessage = "",
}: Props) => {
  return (
    <div className="failRxUpload">
      {errorMessage && errorMessage.length > 0 ? (
        <div className="failTextLight">
          <h4 className="customErrorMessage">{errorMessage}</h4>
        </div>
      ) : (
        <div className="failTextLight">
          <h4 className="failText">Failed to upload!</h4>
          The files must be in one of the format:
          JPG,GIF,JPEG,PNG,DOC,DOCX,TXT,PDF or RTF.Each file cannot exceed size
          of (10MB) in size.
        </div>
      )}
      <div className="failRxUploadDoneBtn" data-testid="failRxUploadDoneBtn">
        <ExpressButton
          parentClass="failRxUploadBtn"
          variant="contained"
          clickHandler={() =>
            changePopUpSection(
              errorMessage && errorMessage.length > 0
                ? MissingRxSection.CHANGE_PRESCRIBER_TYPE
                : MissingRxSection.RX_UPLOAD
            )
          }
        >
          Go Back
        </ExpressButton>
      </div>
    </div>
  );
};
