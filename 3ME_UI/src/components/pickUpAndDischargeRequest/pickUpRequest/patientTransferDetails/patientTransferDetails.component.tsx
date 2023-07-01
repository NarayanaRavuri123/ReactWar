import { useContext, useState } from "react";
import {
  PickUpRequestContext,
  PickUpRequestContextType,
} from "../../../../context/PickUpRequestContext";
import { Validator } from "../../../../util/order.validations";
import { SendNoteValidator } from "../../../send3MNote/sendNote.validator";
import TransferPatient from "../../../send3MNote/transferPatient/transferPatient.component";
import { PickUpRequestValidator } from "../pickUpRequest.validator";
import "./patientTransferDetails.css";

type Props = {};
const PatientTransferDetails = (props: Props) => {
  const pickUpRequestObj = useContext<PickUpRequestContextType | null>(
    PickUpRequestContext
  );
  const transferPatientDetail = pickUpRequestObj!.transferPatientDetail;
  const setTransferPatientDetail = pickUpRequestObj!.setTransferPatientDetail;
  const Validator = new SendNoteValidator();
  const [validator] = useState<SendNoteValidator>(Validator!);
  return (
    <div className="transfer-patient-detail" data-testid="transfer-detail">
      <TransferPatient
        data={transferPatientDetail}
        setData={setTransferPatientDetail}
        Validator={validator}
      />
    </div>
  );
};

export default PatientTransferDetails;
