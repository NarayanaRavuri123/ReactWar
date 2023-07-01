import { useContext, useEffect, useState } from "react";
import {
  MyPatientContext,
  MyPatientContextType,
} from "../../../../context/MyPatientContext";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { Popup } from "../../../../core/popup/popup.component";
import { IPatient, IPatientAlert } from "../../patient.interface";
import { Alerts } from "../../patientAlerts/alerts/alerts.component";
import "./orderDetailsAlertBanner.css";
import {
  Confirm_Placement_Alert_Reason_Text,
  MissingRx_Alert_Reason_Text,
  Pending_Supply_Order_Alert_Reason_Text,
  Proof_of_Delivery_Needed_Alert_Reason_Text,
} from "../../../../util/staticText";
import { IAlertsForRO } from "../orderOverview/orderOverview.interface";

type Props = {
  alertData: IPatientAlert;
  patientData: IPatient;
  alertsForRO?: IPatient;
};

const OrderDetailAlertBanner = ({
  alertData,
  patientData,
  alertsForRO,
}: Props) => {
  const [alertReasonText, setAlertReasonText] = useState("");
  const [alertButtonText, setAlertButtonText] = useState("");
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const MyPatientObj = useContext<MyPatientContextType | null>(
    MyPatientContext
  );
  const buttonClicked = () => {
    setAlertOpen(true);
  };
  const closeAlertPopupReload = (reloadPatiantList: boolean = false) => {
    setAlertOpen(false);
    MyPatientObj?.setReloadMyPatient(reloadPatiantList);
  };
  const buttonTexts = alertButtonText;
  useEffect(() => {
    if (alertData.alertName === "Missing Rx") {
      setAlertReasonText(MissingRx_Alert_Reason_Text);
      setAlertButtonText("Submit Prescription");
    } else if (alertData.alertName === "Proof of Delivery Needed") {
      setAlertReasonText(Proof_of_Delivery_Needed_Alert_Reason_Text);
      setAlertButtonText("Provide Proof of Delivery");
    } else if (alertData.alertName === "Confirm Placement") {
      setAlertReasonText(Confirm_Placement_Alert_Reason_Text);
      setAlertButtonText(alertData?.alertName);
    }
    if (alertData.alertName === "Pending Supply Order") {
      setAlertReasonText(Pending_Supply_Order_Alert_Reason_Text);
      setAlertButtonText("Print Excessive Supply Form");
    }
  }, [alertData?.alertName]);
  return (
    <>
      <div className={`alertText ${alertData?.alertName.replace(/ +/g, "")}`}>
        <div className="alertHeading">
          <h5
            className={`alertReasonParentClass ${alertData?.alertName.replace(
              / +/g,
              ""
            )}`}
            data-testid="alertBanner-header"
          >
            {alertData?.alertName}
          </h5>
          <h5 className="alertReasonText" data-testid="alertReason">
            {alertReasonText}
          </h5>
        </div>
        <div className="alertBannerButton">
          <ExpressButton
            clickHandler={buttonClicked}
            parentClass={`alertNavigationButton ${alertData?.alertName
              .concat("Btn")
              .replace(/ +/g, "")}`}
            variant="outlined"
            testId="alertAction-button"
          >
            {buttonTexts}
          </ExpressButton>
        </div>
      </div>
      {alertOpen && (
        <Popup openFlag={alertOpen} closeHandler={() => setAlertOpen(false)}>
          {
            <Alerts
              closePopUpAction={closeAlertPopupReload}
              data={alertData}
              patient={patientData}
            />
          }
        </Popup>
      )}
    </>
  );
};
export default OrderDetailAlertBanner;
