import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
import {
  IPatient,
  IPatientAlert,
  ISeverityTypes,
} from "../../../patient.interface";
import "./orderOverviewWoundProgressAlert.css";
interface Props {
  selectedPatientData: IPatient;
  selectedWoundId?: string | null;
  alertsForRO?: IPatient;
}

export const WoundProgressAlert = ({
  selectedPatientData,
  selectedWoundId,
  alertsForRO,
}: Props) => {
  const [measurementDue, setMeasurementDue] = useState<Array<IPatientAlert>>(
    []
  );

  useEffect(() => {
    let result: any;
    if (selectedWoundId) {
      result = alertsForRO?.alerts.filter(
        (item: any) =>
          item.alertName === "Measurements Due" &&
          item.woundOrderID === selectedWoundId?.toString()
      );
    } else {
      result = alertsForRO?.alerts.filter(
        (item: any) => item.alertName === "Measurements Due"
      );
    }
    // sort the measurementDue array based on the alertSubLabel property
    result?.sort((a: any, b: any) => {
      const today = new Date();
      const currentYear = today.getFullYear();
      const aLabel = a.alertSubLabel.includes("Today")
        ? today.toISOString().substr(5, 5)
        : a.alertSubLabel.split("-")[1].trim();
      const bLabel = b.alertSubLabel.includes("Today")
        ? today.toISOString().substr(5, 5)
        : b.alertSubLabel.split("-")[1].trim();
      const aDate = new Date(`${currentYear}-${aLabel}`).getTime();
      const bDate = new Date(`${currentYear}-${bLabel}`).getTime();

      return aDate - bDate;
    });
    setMeasurementDue(result);
  }, []);

  const history = useHistory();
  const handleClick = (
    woundOrderID: any,
    assessmentToDate: Date | null,
    assessmentFromDate: Date | null
  ) => {
    history.push({
      pathname: "/addWoundAssessment",
      state: {
        ron: selectedPatientData?.roNumber,
        dob: selectedPatientData?.dob,
        woundOrderId: woundOrderID,
        assessmentToDate: assessmentToDate,
        assessmentFromDate: assessmentFromDate,
        selectedPatientData: selectedPatientData,
      },
    });
  };

  const getSeverityClassName = (severity: ISeverityTypes | null): string => {
    return severity != null
      ? severity === 0
        ? "low"
        : severity === 1
        ? "medium"
        : severity === 2
        ? "high"
        : ""
      : "";
  };
  return (
    <>
      {measurementDue?.map(
        (alert, index) =>
          alert.severity !== 0 &&
          alert.severity !== 1 && (
            <div
              key={index}
              className={`assessmentDueAlertText ${getSeverityClassName(
                alert.severity
              )}`}
            >
              <div
                className="assessmentDueAlertHeading"
                data-testid="assessment-due-heading"
              >
                <p
                  className={`assessmentDueAlertReasonParentClass ${getSeverityClassName(
                    alert.severity
                  )}`}
                >
                  Assessment Due
                </p>
                <p
                  className="assessmentDueAlertReasonText"
                  data-testid="assessment-due-text"
                >
                  {alert.alertSubLabel.toLowerCase().includes("today")
                    ? "Assessment is due today"
                    : "Assessment is due between " + alert.alertSubLabel}
                </p>
              </div>
              <div
                className="assessmentDueAlertBannerButton"
                data-testid="assessment-due-button"
              >
                <ExpressButton
                  clickHandler={() =>
                    handleClick(
                      alert.woundOrderID,
                      alert.assessmentToDate!,
                      alert.assessmentFromDate!
                    )
                  }
                  parentClass={`assessmentDueAlertNavigationButton ${getSeverityClassName(
                    alert.severity
                  )}`}
                  variant="outlined"
                >
                  Add Assessment
                </ExpressButton>
              </div>
            </div>
          )
      )}
    </>
  );
};
export default WoundProgressAlert;
