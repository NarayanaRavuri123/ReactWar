import "./dischargePending.css";
import { AlertDetails } from "../alertDetails/alertDetails.component";
import { IDischargePendingInterface } from "./dischargePending.interface";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  PickUpRequestContext,
  PickUpRequestContextType,
} from "../../../../context/PickUpRequestContext";
import { PickUpRequestPageSection } from "../../../pickUpAndDischargeRequest/pickUpRequest/pickUpRequestPageSection.enum";
import {
  DischargeRequestContext,
  DischargeRequestContextType,
} from "../../../../context/DischargeRequestContext";

export const DischargePending = ({
  completeDischarge,
  closePopUpAction,
  patient,
}: IDischargePendingInterface) => {
  const history = useHistory();
  const pickUpRequestObj = useContext<PickUpRequestContextType | null>(
    PickUpRequestContext
  );
  const dischargeRequestObj = useContext<DischargeRequestContextType | null>(
    DischargeRequestContext
  );

  const openDischargeRequest = () => {
    pickUpRequestObj?.resetData();
    dischargeRequestObj?.resetData();
    pickUpRequestObj?.setPickUpRequestPage(
      PickUpRequestPageSection.DISCHARGE_REQUEST_START_FORM
    );
    pickUpRequestObj?.setPatient(patient);
    history.push("/home/dischargeRequest");
  };

  return (
    <>
      <AlertDetails
        title="Discharge pending"
        titleClassName="discharge-pending-header-title"
        body="Proceed to completing discharge order."
        footer="Complete Discharge"
        buttonOnClick={completeDischarge ?? openDischargeRequest}
        showCallForAssistance={false}
      />
    </>
  );
};
