import { IPatient } from "../components/myPatients/patient.interface";
import { IVACProductInfo } from "../components/supplyOrder/patientVACDetail/patientVACDetail.interface";

export const defaultPatientData: IPatient = {
  roNumber: 26212342,
  lastName: "Cobb",
  firstName: "Liana",
  dob: "10/30/1982",
  facilityName: "Hope Home Health",
  orderCreationDate: "Dec 22, 2021 12:32 PM",
  alerts: [],
};

export const defaultVACProdcutInfo: IVACProductInfo = {
  imageLink: "",
  brandName: "ActiV.A.C.™ Therapy System",
};
