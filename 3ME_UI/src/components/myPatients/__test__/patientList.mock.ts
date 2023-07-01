import { IPatient, IAlertTypes, ISeverityTypes } from "../patient.interface";

export const patientList: IPatient[] = [
  {
    roNumber: 26212341,
    lastName: "Cherry",
    firstName: "Sophia",
    dob: "10/30/1981",
    facilityName: "Hope Home Health",
    orderCreationDate: "Dec 21, 2021 12:32 PM",
    orderID: "",
    alerts: [
      {
        alertID: "AL01",
        alertName: "Missing Rx",
        alertSubLabel: "",
        alertDate: null,
        alertType: IAlertTypes.MISRX,
        severity: null,
      },
    ],
    menuActions: [
      {
        text: "Continue Saved Order",
        sequence: 1,
      },
      {
        text: "Delete Saved Order",
        sequence: 2,
      },
      {
        text: "Stop Sharing Order",
        sequence: 3,
      },
    ],
  },
  {
    roNumber: 26212342,
    lastName: "Cobb",
    firstName: "Liana",
    dob: "10/30/1982",
    facilityName: "Hope Home Health",
    orderCreationDate: "Dec 22, 2021 12:32 PM",
    orderID: "",
    alerts: [
      {
        alertID: "AL02",
        alertName: "Measurements Due",
        alertSubLabel: "For Jan 21-Jan 28",
        alertDate: null,
        alertType: IAlertTypes.MSDUE,
        severity: ISeverityTypes.MEDIUM,
      },
    ],
    menuActions: [
      {
        text: "Continue Saved Order",
        sequence: 1,
      },
      {
        text: "Delete Saved Order",
        sequence: 2,
      },
      {
        text: "Stop Sharing Order",
        sequence: 3,
      },
    ],
  },
  {
    roNumber: 26212343,
    lastName: "Douglas",
    firstName: "Doug",
    dob: "10/30/1983",
    facilityName: "Hope Home Health",
    orderCreationDate: "Dec 23, 2021 12:32 PM",
    orderID: "",
    alerts: [
      {
        alertID: "AL03",
        alertName: "Pending Supply Order",
        alertSubLabel: "Excessive Supply",
        alertDate: null,
        alertType: IAlertTypes.PNDSO,
        severity: null,
      },
    ],
    menuActions: [
      {
        text: "Continue Saved Order",
        sequence: 1,
      },
      {
        text: "Delete Saved Order",
        sequence: 2,
      },
      {
        text: "Stop Sharing Order",
        sequence: 3,
      },
    ],
  },
  {
    roNumber: 26212344,
    lastName: "Eamon",
    firstName: "Nina",
    dob: "10/30/1984",
    facilityName: "Hope Home Health",
    orderCreationDate: "Dec 24, 2021 12:32 PM",
    orderID: "",
    alerts: [
      {
        alertID: "AL04",
        alertName: "Measurements Due",
        alertSubLabel: "For Jan 21-Jan 28",
        alertDate: null,
        alertType: IAlertTypes.MSDUE,
        severity: ISeverityTypes.LOW,
      },
      {
        alertID: "AL05",
        alertName: "Supplies Delivered",
        alertSubLabel: "",
        alertDate: new Date("2022-03-14"),
        alertType: IAlertTypes.SUPDE,
        severity: null,
      },
    ],
    menuActions: [
      {
        text: "Continue Saved Order",
        sequence: 1,
      },
      {
        text: "Delete Saved Order",
        sequence: 2,
      },
      {
        text: "Stop Sharing Order",
        sequence: 3,
      },
    ],
  },
  {
    roNumber: 26212345,
    lastName: "Edgar",
    firstName: "Elliot",
    dob: "10/30/1985",
    facilityName: "Hope Home Health",
    orderCreationDate: "Dec 25, 2021 12:32 PM",
    orderID: "",
    alerts: [
      {
        alertID: "AL09",
        alertName: "Shared Order",
        alertSubLabel: "From Jenny Kale",
        alertDate: null,
        alertType: IAlertTypes.SHODR,
        severity: null,
      },
    ],
    menuActions: [
      {
        text: "Continue Saved Order",
        sequence: 1,
      },
      {
        text: "Delete Saved Order",
        sequence: 2,
      },
      {
        text: "Stop Sharing Order",
        sequence: 3,
      },
    ],
  },
  {
    roNumber: 26212346,
    lastName: "Esparragueza",
    firstName: "Immacuella",
    dob: "10/30/1986",
    facilityName: "Very Long Home Health Agency Name",
    orderCreationDate: "Dec 26, 2021 12:32 PM",
    orderID: "",
    alerts: [
      {
        alertID: "AL12",
        alertName: "Measurements Due",
        alertSubLabel: "Measurements due Today",
        alertDate: null,
        alertType: IAlertTypes.MSDUE,
        severity: ISeverityTypes.HIGH,
      },
      {
        alertID: "AL06",
        alertName: "Missing Docs",
        alertSubLabel: "",
        alertDate: null,
        alertType: IAlertTypes.MSDOC,
        severity: null,
      },
      {
        alertID: "AL07",
        alertName: "Measurements Due",
        alertSubLabel: "For Jun 21-Jun 28",
        alertDate: null,
        alertType: IAlertTypes.MSDUE,
        severity: ISeverityTypes.LOW,
      },
      {
        alertID: "AL08",
        alertName: "Supplies Delivered",
        alertSubLabel: "",
        alertDate: new Date("2022-03-14"),
        alertType: IAlertTypes.SUPDE,
        severity: null,
      },
    ],
    menuActions: [
      {
        text: "Continue Saved Order",
        sequence: 1,
      },
      {
        text: "Delete Saved Order",
        sequence: 2,
      },
      {
        text: "Stop Sharing Order",
        sequence: 3,
      },
    ],
  },
  {
    roNumber: 26212347,
    lastName: "Hunt",
    firstName: "Messiah",
    dob: "10/30/1987",
    facilityName: "Hope Home Health",
    orderCreationDate: "Dec 27, 2021 12:32 PM",
    orderID: "",
    alerts: [
      {
        alertID: "AL13",
        alertName: "Supplies Delivered",
        alertSubLabel: "",
        alertDate: new Date("2022-03-14"),
        alertType: IAlertTypes.SUPDE,
        severity: null,
      },
    ],
    menuActions: [
      {
        text: "Continue Saved Order",
        sequence: 1,
      },
      {
        text: "Delete Saved Order",
        sequence: 2,
      },
      {
        text: "Stop Sharing Order",
        sequence: 3,
      },
    ],
  },
  {
    roNumber: 26212348,
    lastName: "Newman",
    firstName: "Nelsey",
    dob: "10/30/1988",
    facilityName: "Hope Home Health",
    orderCreationDate: "Dec 28, 2021 12:32 PM",
    orderID: "",
    alerts: [
      {
        alertID: "AL10",
        alertName: "Proof of Delivery Needed",
        alertSubLabel: "",
        alertDate: null,
        alertType: IAlertTypes.PODEL,
        severity: null,
      },
    ],
    menuActions: [
      {
        text: "Continue Saved Order",
        sequence: 1,
      },
      {
        text: "Delete Saved Order",
        sequence: 2,
      },
      {
        text: "Stop Sharing Order",
        sequence: 3,
      },
    ],
  },
  {
    roNumber: 26212349,
    lastName: "Solomon",
    firstName: "Sarah",
    dob: "10/30/1989",
    facilityName: "Hope Home Health",
    orderCreationDate: "Dec 29, 2021 12:32 PM",
    orderID: "",
    alerts: [
      {
        alertID: "AL11",
        alertName: "Confirm Placement",
        alertSubLabel: "",
        alertDate: null,
        alertType: IAlertTypes.CONPL,
        severity: null,
      },
    ],
    menuActions: [
      {
        text: "Continue Saved Order",
        sequence: 1,
      },
      {
        text: "Delete Saved Order",
        sequence: 2,
      },
      {
        text: "Stop Sharing Order",
        sequence: 3,
      },
    ],
  },
  {
    roNumber: 26212350,
    lastName: "Zander",
    firstName: "Zora",
    dob: "10/30/1990",
    facilityName: "Hope Home Health",
    orderCreationDate: "Dec 30, 2021 12:32 PM",
    orderID: "",
    alerts: [],
    menuActions: [
      {
        text: "Continue Saved Order",
        sequence: 1,
      },
      {
        text: "Delete Saved Order",
        sequence: 2,
      },
      {
        text: "Stop Sharing Order",
        sequence: 3,
      },
    ],
  },
  {
    roNumber: 26982595,
    lastName: "BARUWA",
    firstName: "MICHAEL",
    dob: "01/22/1979",
    facilityName: "GW WOUND CARE AND LIMB PRESERVATION",
    orderCreationDate: "Nov 22, 202 10:45 PM",
    orderID: "",
    alerts: [],
    menuActions: [
      {
        text: "Order Supplies",
        sequence: 0,
      },
      {
        text: "Add Wound Assessment",
        sequence: 1,
      },
      {
        text: "Upload Documents",
        sequence: 2,
      },
      {
        text: "Send 3M A Note",
        sequence: 3,
      },
      {
        text: "Pickup/Discharge Request",
        sequence: 4,
      },
      {
        text: "Discharge Request",
        sequence: 5,
      },
      {
        text: "Hold Therapy",
        sequence: 6,
      },
      {
        text: "Resume Therapy",
        sequence: 7,
      },
      {
        text: "Remove Patient",
        sequence: 8,
      },
    ],
  },
];
