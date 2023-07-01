import { SubmitProofOfDeliveryContextType } from "../../../context/submitProofOfDeliveryContext";
import { IDropZoneDocumentSelect } from "../../../core/customDropZone/dropZoneDocumentSelect.interface";
import { IPatient } from "../patient.interface";

const mockPatient = (): IPatient => ({
  roNumber: 123,
  firstName: "Rahul",
  lastName: "Patil",
  dob: "01/01/2000",
  facilityName: "Hospital",
  orderCreationDate: "01/01/2021",
  alerts: [],
  status: "On therapy",
  statusColor: null,
  productName: "Test",
  placementDate: "01/01/2022",
  productSerialNumber: "VRTM45059",
});

const mockPodUploadDoc = (): IDropZoneDocumentSelect => ({
  documentName: "Abc",
  documentBase64: "sample",
  documentId: "123",
  errorMessage: "Mock",
  isFetchingBase64: true,
  succeeded: true,
});

export const getMockSubitProofOfDeliveryContextData =
  (): SubmitProofOfDeliveryContextType => {
    return {
      patient: mockPatient(),
      setPatient: () => {},
      proofOfDeliveryUploadDocs: [mockPodUploadDoc()],
      setProofOfDeliveryUploadDocs: () => {},
      fileStatus: "Upload Successful!",
      setFileStatus: () => {},
      resetData: () => {},
      isUploadFaxActive: [],
      setIsUploadFaxActive: () => {},
    };
  };
