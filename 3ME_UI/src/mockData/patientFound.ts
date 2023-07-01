import {
  IAlertTypes,
  IPatient,
  IPatientAlert,
} from "../components/myPatients/patient.interface";

export const patientMockData: IPatient = {
  dob: "06/07/1959",
  lastName: "Waters",
  firstName: "Haley",
  alerts: [
    {
      alertDate: null,
      alertID: "AL01",
      alertName: "Missing Rx",
      alertSubLabel: "",
      alertType: IAlertTypes.MISRX,
      severity: null,
      sharedData: {
        OrderId: "1501",
        From: "Pallavi",
        To: "Poly",
        Notes: "Shared with ",
        FromRecipientName: "Pratik",
        ToRecipientName: "Sanvi",
        CreatedOn: "2022-01-01T07:35:45.321888Z",
      },
    },
    {
      alertDate: null,
      alertID: "AL01",
      alertName: "Missing Docs",
      alertSubLabel: "",
      alertType: IAlertTypes.MSDOC,
      severity: null,
      statusDelayReason: {
        RON: 12334,
        statusDelayReasons: [
          {
            delayDetail: "missing doc for wound",
            delayReason: "document not ready",
          },
        ],
      },
      sharedData: {
        OrderId: "1501",
        From: "Pallavi",
        To: "Poly",
        Notes: "Shared with ",
        FromRecipientName: "Pratik",
        ToRecipientName: "Sanvi",
        CreatedOn: "2022-01-01T07:35:45.321888Z",
      },
    },
    {
      alertDate: null,
      alertID: "AL05",
      alertName: "Measurements Due",
      alertSubLabel: "",
      alertType: IAlertTypes.MSDUE,
      severity: null,
      sharedData: {
        OrderId: "1501",
        From: "Test",
        To: "dev",
        Notes: "Shared with ",
        FromRecipientName: "Pratik",
        ToRecipientName: "Sanvi",
        CreatedOn: "2022-01-01T07:35:45.321888Z",
      },
    },
  ],
  orderCreationDate: "02/08/2000",
  facilityName: "Fortis",
  roNumber: 12345678,
  productName: "3M VAC Device",
  placementDate: "06/07/2020",
  productSerialNumber: "VRTM45059",
  status: "Closed",
};

export const alertMockData: IPatientAlert = {
  alertID: "AL01",
  alertName: "Missing Rx",
  alertSubLabel:
    "A prescription has not been received and validated for this order.",
  alertDate: null,
  alertType: IAlertTypes.MISRX,
  severity: null,
  sharedData: null,
  woundOrderID: null,
};
