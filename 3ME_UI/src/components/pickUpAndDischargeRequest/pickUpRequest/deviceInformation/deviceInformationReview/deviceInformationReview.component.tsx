import React from "react";
import "./deviceInformationReview.css";
import WoundTitleValue from "../../../../myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import { IPickUpRequest } from "../../pickUpRequest.interface";

type Props = { data: IPickUpRequest };

const DeviceInformationReview = ({ data }: Props) => {
  const getInjuryAndProblemText = () => {
    if (
      data.describeTheInjury.value === "" &&
      data.describeTheProblem.value === ""
    ) {
      return "";
    } else {
      return `${data.describeTheInjury.value} ${
        data.describeTheProblem.value !== ""
          ? `(${data.describeTheProblem.value})`
          : ""
      }`;
    }
  };

  return (
    <div className="pickup-device-info">
      <div
        className="pickupConfirmDesp-title"
        data-testId="deviceInfoDesp-title"
      >
        Device Information
      </div>
      <div className="pickupConfirmDesp-rowDiv">
        <WoundTitleValue
          title={"Medical Injury"}
          value={data.injuryCauseBy3MDevice.value}
        />
        <WoundTitleValue
          title={"Product Problem"}
          value={data.problemWith3MDevice.value}
        />
      </div>
      <WoundTitleValue
        title={"Describe the injury/problem"}
        value={getInjuryAndProblemText()}
        formatValue={false}
      />
    </div>
  );
};

export default DeviceInformationReview;
