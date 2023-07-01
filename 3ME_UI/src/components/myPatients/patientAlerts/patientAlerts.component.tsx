import React, { useContext } from "react";
import AlertButton from "../../../core/alertButton/alertButton.component";
import { Popup } from "../../../core/popup/popup.component";
import { IPatientAlertInterface } from "./patientAlerts.interface";
import { Alerts } from "./alerts/alerts.component";
import {
  MyPatientContext,
  MyPatientContextType,
} from "../../../context/MyPatientContext";

const PatientAlerts = ({
  alertData,
  patient,
  patientAnalytics,
}: IPatientAlertInterface) => {
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const MyPatientObj = useContext<MyPatientContextType | null>(
    MyPatientContext
  );
  const handleAlertClick = () => {
    patientAnalytics(`${alertData.alertName} Alert MyPatient`);
    setAlertOpen(true);
  };

  const closeAlertPopupReload = (reloadPatiantList: boolean = false) => {
    setAlertOpen(false);
    MyPatientObj?.setReloadMyPatient(reloadPatiantList);
  };

  return (
    <>
      <AlertButton alertData={alertData} onClick={handleAlertClick} />
      <Popup openFlag={alertOpen} closeHandler={() => setAlertOpen(false)}>
        {
          <Alerts
            closePopUpAction={closeAlertPopupReload}
            data={alertData}
            patient={patient}
          />
        }
      </Popup>
    </>
  );
};

export default PatientAlerts;
