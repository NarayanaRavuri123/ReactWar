import { MyPatientContextType } from "../../../../context/MyPatientContext";
import { patientMockData } from "../../../../mockData/patientFound";

export enum MyPatientModalSection {
  LOAD_PATIENT = "loadpatient",
  PATIENT_LOCKED = "patientlock",
  PATIENT_SUBMITTED = "Submitted",
  PATIENT_SAVED = "Saved",
  PATIENT_EMPTY = "EMPTY",
}

export const getMockPatientOrderData = (): MyPatientContextType => ({
  reloadMyPatient: false,
  setReloadMyPatient: () => {},
  openPatientOrderAndDetail: true,
  setOpenPatientOrderAndDetail: () => {},
  myPatientClickModalSection: MyPatientModalSection.PATIENT_SUBMITTED,
  setMyPatientClickModalSection: () => {},
  hubConnection: undefined,
  setHubConnection: () => {},
  patientOrderStatus: "",
  setPatientOrderStatus: () => {},
  uploadDocuments: [],
  setUploadDocuments: () => {},
  orderId: "",
  setorderId: () => {},
  orderLockedByFullName: "",
  setorderLockedByFullName: () => {},
  isPatientLocked: false,
  setIsPatientLocked: () => {},
  isPatientLockedChecked: false,
  setIsPatientLockedChecked: () => {},
});
