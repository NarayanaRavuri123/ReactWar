import {
  IWounds,
  IWoundsForRO,
} from "../components/myPatients/alert.interface";
import {
  IAlertTypes,
  IPatientAlert,
  ISeverityTypes,
  ISharedOrderData,
  statusDelayReason,
} from "../components/myPatients/patient.interface";
import { convertToMmmDDFormat } from "./utilityFunctions";

export const uid = () => Math.floor(Math.random() * Date.now()).toString();

export const getAlertName = (alertType: IAlertTypes) => {
  switch (alertType) {
    case IAlertTypes.MISRX:
      return "Missing Rx";
    case IAlertTypes.MSDOC:
      return "Missing Docs";
    case IAlertTypes.MSDUE:
      return "Measurements Due";
    case IAlertTypes.CONPL:
      return "Confirm Placement";
    case IAlertTypes.DISPEN:
      return "Discharge Pending";
    case IAlertTypes.PNDSO:
      return "Pending Supply Order";
    case IAlertTypes.PODEL:
      return "Proof of Delivery Needed";
    case IAlertTypes.SHODR:
      return "Shared Order";
    case IAlertTypes.SUPDE:
      return "Supplies Delivered";
  }
};

export function createAlert(
  alertType: IAlertTypes,
  label: string = "",
  alertDt: Date | null = null,
  sharedData: ISharedOrderData | null = null
): IPatientAlert {
  let alert: IPatientAlert = {
    alertID: uid(),
    alertName: getAlertName(alertType),
    alertSubLabel: label,
    alertDate: alertDt,
    alertType: alertType,
    severity: null,
    sharedData: sharedData,
  };
  return alert;
}

export function createMeasurementDueAlert(
  wounds: Array<IWounds>
): Array<IPatientAlert> {
  let patientAlerts: Array<IPatientAlert> = [];
  wounds?.forEach((y) => {
    y.PendingCycles?.forEach((x) => {
      const from = new Date(x.From);
      const to = new Date(x.To);

      let alert: IPatientAlert = {
        alertID: uid(),
        alertName: getAlertName(IAlertTypes.MSDUE),
        alertSubLabel: getMeasurementDueAlertTitle(from, to),
        alertDate: null,
        alertType: IAlertTypes.MSDUE,
        severity: getSeverity(from, to),
        woundOrderID: y.Id,
        assessmentFromDate: from,
        assessmentToDate: to,
      };
      patientAlerts.push(alert);
    });
  });
  return patientAlerts;
}

export function createMeasurementDueAlertRo(
  wounds: Array<IWoundsForRO>
): Array<IPatientAlert> {
  let patientAlerts: Array<IPatientAlert> = [];
  wounds?.forEach((y) => {
    y.pendingCycles?.forEach((x) => {
      const from = new Date(x.from);
      const to = new Date(x.to);

      let alert: IPatientAlert = {
        alertID: uid(),
        alertName: getAlertName(IAlertTypes.MSDUE),
        alertSubLabel: getMeasurementDueAlertTitle(from, to),
        alertDate: null,
        alertType: IAlertTypes.MSDUE,
        severity: getSeverity(from, to),
        woundOrderID: y.id,
        assessmentFromDate: from,
        assessmentToDate: to,
      };
      patientAlerts.push(alert);
    });
  });
  return patientAlerts;
}

export function getSeverity(from: Date, to: Date): ISeverityTypes {
  const today = new Date();
  let inFiveDays = new Date();
  inFiveDays.setDate(today.getDate() + 5);
  let inForteenDays = new Date();
  inForteenDays.setDate(today.getDate() + 14);
  let severity = ISeverityTypes.LOW;
  if (to <= today) {
    severity = ISeverityTypes.HIGH;
  } else if (to <= inFiveDays) {
    severity = ISeverityTypes.MEDIUM;
  } else if (from <= inForteenDays) {
    severity = ISeverityTypes.LOW;
  }
  return severity;
}

export function getMeasurementDueAlertTitle(from: Date, to: Date): string {
  let title = `For ${convertToMmmDDFormat(from)}-${convertToMmmDDFormat(to)}`;
  if (
    new Date(to).getTime() === new Date(new Date().toDateString()).getTime()
  ) {
    title = "Measurements due Today";
  }

  return title;
}

export function getSupplyOrderPendingAlert(
  alertType: IAlertTypes,
  label: string = "",
  ropn: string | null
): IPatientAlert {
  let pendingAlert: IPatientAlert = {
    alertID: uid(),
    alertName: getAlertName(alertType),
    alertSubLabel: label,
    alertDate: null,
    alertType: alertType,
    severity: null,
    ropn: ropn,
  };
  return pendingAlert;
}
export function getMissingDocsAlert(
  alertType: IAlertTypes,
  label: string = "",
  statusDelayReason?: statusDelayReason
): IPatientAlert {
  let missingDocAlert: IPatientAlert = {
    alertID: uid(),
    alertName: getAlertName(alertType),
    alertSubLabel: label,
    alertDate: null,
    alertType: alertType,
    severity: null,
    statusDelayReason: statusDelayReason,
  };
  return missingDocAlert;
}

export function getSupplyOrderDeliveredAlert(
  alertType: IAlertTypes,
  ropn: string | null,
  alertDt: Date | null = null
): IPatientAlert {
  let suppliesDeliveredAlert: IPatientAlert = {
    alertID: uid(),
    alertName: getAlertName(alertType),
    alertSubLabel: "",
    alertDate: alertDt,
    alertType: alertType,
    severity: null,
    ropn: ropn,
  };
  return suppliesDeliveredAlert;
}
