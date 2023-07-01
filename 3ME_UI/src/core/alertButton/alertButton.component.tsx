import React, { MouseEventHandler } from "react";
import { getAlertBgAndLabelColor } from "../../util/utilityFunctions";
import { IPatientAlert } from "../../components/myPatients/patient.interface";
import "./alertButton.css";
import moment from "moment";

type AlertArrowProps = {
  stroke: string;
};

export const AlertArrow = ({ stroke }: AlertArrowProps) => {
  return (
    <svg
      width="10"
      height="18"
      viewBox="0 0 10 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 17L9 9L1 1"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

type AlertButtonProps = {
  alertData: IPatientAlert;
  onClick: MouseEventHandler<HTMLDivElement>;
};

const AlertButton = ({ alertData, onClick }: AlertButtonProps) => {
  return (
    <div
      className={`${
        alertData.alertDate === null && alertData.alertSubLabel === ""
          ? `alert-box`
          : `alert-box alert-box-small-padding`
      }`}
      style={{
        background: getAlertBgAndLabelColor(
          alertData.alertType,
          alertData.severity
        )[0],
      }}
      onClick={onClick}
      key={alertData.alertID.toString()}
    >
      <div className="label-arrow-box">
        <div
          className="alert-name"
          style={{
            color: getAlertBgAndLabelColor(
              alertData.alertType,
              alertData.severity
            )[1],
          }}
        >
          {alertData.alertName}
          <div
            className="alert-label-and-date"
            id={`${alertData.alertID}label`}
            data-testid={`${alertData.alertID}label`}
          >
            {alertData.alertSubLabel}
          </div>
          <div
            className="alert-label-and-date"
            id={`${alertData.alertID}date`}
            data-testid={`${alertData.alertID}date`}
          >
            {alertData.alertDate
              ? moment(alertData.alertDate).format("MM/DD/YYYY")
              : null}
          </div>
        </div>
        <AlertArrow
          stroke={
            getAlertBgAndLabelColor(alertData.alertType, alertData.severity)[1]
          }
        />
      </div>
    </div>
  );
};

export default AlertButton;
