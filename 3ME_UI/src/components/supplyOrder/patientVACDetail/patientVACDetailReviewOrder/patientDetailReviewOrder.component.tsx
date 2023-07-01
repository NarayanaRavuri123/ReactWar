import moment from "moment";
import React from "react";
import { IPatient } from "../../../myPatients/patient.interface";
import { IVACProductInfo } from "../patientVACDetail.interface";
import "./patientDetailReviewOrder.css";
type Props = {
  patient: IPatient;
  vacProductInfo: IVACProductInfo;
};

const PatientDetailReviewOrder = ({ patient, vacProductInfo }: Props) => {
  return (
    <div className="patient-vac-reviewdetails">
      <h3 className="patient-name" data-testid="patient-name">
        {`${patient.lastName}, ${patient.firstName}`}
      </h3>
      <h3 className="patient-dob" data-testid="patient-dob">
        {`DOB: ${moment(patient.dob).format("L")}`}
      </h3>
      <div className="device-details">
        <img
          className="device-image"
          data-testid="device-image"
          src={vacProductInfo.imageLink}
          alt=""
        />
        <h3 className="device-descriptiopn" data-testid="device-descriptiopn">
          {vacProductInfo.brandName}
        </h3>
      </div>
    </div>
  );
};

export default PatientDetailReviewOrder;
