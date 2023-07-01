import React from "react";
import "./missingRxPrescriptionSent.css";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
import { IPrescriberDetailInterface } from "../missingRxEPrescription/prescriberDetail.interface";
import { makeCapitalEachWordInString } from "../../../../../util/utilityFunctions";

interface Props {
  closePopUpAction: Function;
  prescriberDetails: IPrescriberDetailInterface;
  setPrescriberDetails: React.Dispatch<
    React.SetStateAction<IPrescriberDetailInterface>
  >;
}

const MissingRxPrescriptionSent = ({
  closePopUpAction,
  prescriberDetails,
  setPrescriberDetails,
}: Props) => {
  return (
    <div className="prescriptionSentdiv">
      <div className="success-text">
        <span className="success-span">Success!</span> The e-prescription email
        has been sent to:
      </div>
      <div className="prescriberSentBox">
        <div>
          <div className="headers-text" data-testid="pres-name">
            Prescriber Name
          </div>
          <div className="headers-value">
            {prescriberDetails.prescriberName.value !== ""
              ? makeCapitalEachWordInString(
                  prescriberDetails.prescriberName.value
                )
              : "--"}
          </div>
        </div>
        <div>
          <div className="headers-text">Prescriber Email Address</div>
          <div className="headers-value">
            {prescriberDetails.updatedPrescriberEmail.value !== ""
              ? prescriberDetails.updatedPrescriberEmail.value
              : "--"}
          </div>
        </div>
      </div>
      <div className="email-info" data-testid="email-infoid">
        You will receive an email once the e-prescription has been signed
      </div>
      <ExpressButton
        clickHandler={() => closePopUpAction()}
        parentClass="done-button"
        variant="contained"
      >
        Done
      </ExpressButton>
    </div>
  );
};

export default MissingRxPrescriptionSent;
