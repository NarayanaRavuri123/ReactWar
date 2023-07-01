import { useState } from "react";
import "./proofOfDeliveryNeeded.css";
import { Popup } from "../../../../core/popup/popup.component";
import { AlertDetails } from "../alertDetails/alertDetails.component";
import { ReactComponent as PrintIcon } from "../../../../assets/print.svg";
import { useHistory } from "react-router-dom";
import { IPatient } from "../../patient.interface";

type Props = {
  patient: IPatient;
  closePopUpAction: Function;
};

export const ProofOfDeliveryNeeded = ({ closePopUpAction, patient }: Props) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    closePopUpAction();
  };

  const handleButtonClick = () => {
    history.push({
      pathname: "/home/proofOfDelivery",
      state: {
        stateData: patient,
      },
    });
  };

  return (
    <>
      <AlertDetails
        title="Proof of Delivery Needed"
        titleClassName="proof-delivery-needed-header-title"
        body={
          "Proof of Delivery (POD) needs to be signed for therapy to begin."
        }
        footer="Reprint POD"
        showCallForAssistance={true}
        buttonIcon={<PrintIcon />}
        buttonOnClick={handleButtonClick}
      />
    </>
  );
};
