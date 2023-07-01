import "./missingRxEPrescription.css";
import React, { useEffect, useState } from "react";
import { MissingRxSection } from "../missingRx.enum";
import { IPatient } from "../../../patient.interface";
import { IPrescriberDetailInterface } from "./prescriberDetail.interface";
import { makeCapitalEachWordInString } from "../../../../../util/utilityFunctions";
import ChangeEPrescription from "../changePrescriptionType/changeEPrescription/changeEPrescription.component";

interface Props {
  changePopUpSection: (newSection: MissingRxSection) => void;
  closePopUpAction: Function;
  patientData: IPatient;
  prescriberDetails: IPrescriberDetailInterface;
  showErrorMessage: boolean;
  setPrescriberDetails: React.Dispatch<
    React.SetStateAction<IPrescriberDetailInterface>
  >;
}

const MissingRxEPrescription = ({
  changePopUpSection,
  patientData,
  prescriberDetails,
  showErrorMessage,
  setPrescriberDetails,
}: Props) => {
  const [editPrescriberMode, setEditPrescriberMode] = useState(false);
  const [originalPrescriberDetails] =
    useState<IPrescriberDetailInterface>(prescriberDetails);

  const callReSendPrescription = () => {
    changePopUpSection(MissingRxSection.MISSING_RX_LOADER);
    setTimeout(() => {
      changePopUpSection(MissingRxSection.E_PRESBRIBER_SENT);
    }, 500);
  };

  return (
    <div className="missingRxEPrescription">
      <div
        className="description-missing-rx"
        data-testid="description-missing-rx"
      >
        An ActiV.A.C.™ order has been submitted for{" "}
        <span className="patientNamespan">
          {makeCapitalEachWordInString(patientData.lastName) +
            " " +
            makeCapitalEachWordInString(patientData.firstName)}
        </span>
        , but a signed Rx has not been received. An ActiV.A.C.™ cannot be
        released without a signed prescription.
      </div>
      <div className="desp-text-link">
        <div className="desp-text" data-testid="desp-text">
          Prescription type from your order
        </div>
        <div
          onClick={() => {
            if (editPrescriberMode) {
              setPrescriberDetails(originalPrescriberDetails);
            }
            changePopUpSection(MissingRxSection.CHANGE_PRESCRIBER_TYPE);
          }}
          className="desp-link"
          data-testid="desp-link"
        >
          Change prescription type
        </div>
      </div>
      <div className="title-text">E-Prescription</div>
      <div className="title-msg" data-testid="title-msg">
        A DocuSign email was originally sent to the following prescriber:
      </div>
      <div className="change-e-prescription">
        <ChangeEPrescription
          showErrorMessage={showErrorMessage}
          changePopUpSection={changePopUpSection}
          editPrescriberMode={editPrescriberMode}
          prescriberDetails={prescriberDetails}
          setEditPrescriberMode={setEditPrescriberMode}
          setPrescriberDetails={setPrescriberDetails}
          resendPrescriptionClicked={callReSendPrescription}
        />
      </div>
    </div>
  );
};

export default MissingRxEPrescription;
