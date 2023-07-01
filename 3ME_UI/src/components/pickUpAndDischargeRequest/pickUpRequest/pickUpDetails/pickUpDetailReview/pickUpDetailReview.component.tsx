import React from "react";
import "./pickUpDetailReview.css";
import WoundTitleValue from "../../../../myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import { IPickUpRequest } from "../../pickUpRequest.interface";
import { formatDate } from "../../../../../util/utilityFunctions";

type Props = { data: IPickUpRequest };

const PickUpDetailReview = ({ data }: Props) => {
  return (
    <div>
      <div className="pickupConfirmDesp-title" data-testId="pickupDesp-title">
        Pickup Details
      </div>
      <div className="pickupConfirmDesp-rowDiv">
        <WoundTitleValue
          title={"Therapy Discharge Date"}
          value={formatDate(data.therapyDischargeDate.value)}
        />
        <WoundTitleValue
          title={"Stop Bill Date"}
          value={formatDate(data.stopBillDate.value)}
        />
      </div>
      <WoundTitleValue
        title={"Return Method"}
        value={data.returnMethod.value}
        formatValue={false}
      />
      <WoundTitleValue
        title={"Special Instructions"}
        value={data.specialInstructions.value}
        formatValue={false}
      />
    </div>
  );
};

export default PickUpDetailReview;
