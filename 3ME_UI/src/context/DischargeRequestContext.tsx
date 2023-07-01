import { createContext, useState } from "react";
import { IDischargeRequest } from "../components/pickUpAndDischargeRequest/dischargeRequest/dischargeRequest.interface";
import { defaultDischargeRequestData } from "../components/pickUpAndDischargeRequest/dischargeRequest/dischargeRequest.model";
import { getDeepClone } from "../util/ObjectFunctions";
import { IDropZoneDocumentSelect } from "../core/customDropZone/dropZoneDocumentSelect.interface";
import { DischargeRequestionPageSection } from "../components/pickUpAndDischargeRequest/dischargeRequest/dischargeRequestPageSection.enum";
import { IAttestationAndSign } from "../core/attestationAndSignature/attestationAndSign.interface";
import { dischargeRequestAttest } from "../components/pickUpAndDischargeRequest/dischargeRequest/reviewDischargeRequest/attestationSignature.model";
import { woundAssessmentAttest } from "../components/myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundReviewAssessment/attestationAndSignature.model";
export type DischargeRequestContextType = {
  dischargeRequestData: IDischargeRequest;
  setDischargeRequestData: React.Dispatch<
    React.SetStateAction<IDischargeRequest>
  >;
  dischargeRequestPageSection: DischargeRequestionPageSection;
  setDischargeRequestPageSection: React.Dispatch<
    React.SetStateAction<DischargeRequestionPageSection>
  >;
  patientAdmissionTypeActive: boolean | null;
  setPatientAdmissionTypeActive: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  dischargeRequestDocuments: IDropZoneDocumentSelect[];
  setDischargeRequestDocuments: React.Dispatch<
    React.SetStateAction<IDropZoneDocumentSelect[]>
  >;
  deletedDischargeRequestDocuments: string[];

  setDeletedDischargeRequestDocuments: React.Dispatch<
    React.SetStateAction<string[]>
  >;
  isHandleChangeTriggered: boolean;

  setIsHandleChangeTriggered: React.Dispatch<React.SetStateAction<boolean>>;
  errorInUploadFiles: boolean;

  setErrorInUploadFiles: React.Dispatch<React.SetStateAction<boolean>>;
  scrollableDischargeComponentClassName: string | undefined;
  setScrollableDischargeComponentClassName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  resetData: () => void;
  isPreviousClicked: boolean;
  setIsPreviousClicked: React.Dispatch<React.SetStateAction<boolean>>;
  dischargeReqAttestation: IAttestationAndSign;
  setDischargeReqAttestation: React.Dispatch<
    React.SetStateAction<IAttestationAndSign>
  >;
  woundInfoDetails: any;
  setWoundInfoDetails: React.Dispatch<any>;

  pdfUrls: string[];
  setPdfUrls: React.Dispatch<string[]>;
};
type DischargeRequestContextProviderProps = {
  children: React.ReactNode;
};
export const DischargeRequestContext =
  createContext<DischargeRequestContextType | null>(null);
export const DischargeRequestContextProvider = ({
  children,
}: DischargeRequestContextProviderProps) => {
  const [dischargeRequestData, setDischargeRequestData] =
    useState<IDischargeRequest>(getDeepClone(defaultDischargeRequestData));
  const [isHandleChangeTriggered, setIsHandleChangeTriggered] = useState(false);
  const [dischargeRequestDocuments, setDischargeRequestDocuments] = useState<
    IDropZoneDocumentSelect[]
  >([]);
  const [
    deletedDischargeRequestDocuments,
    setDeletedDischargeRequestDocuments,
  ] = useState<string[]>([]);
  const [errorInUploadFiles, setErrorInUploadFiles] = useState(false);
  const [
    scrollableDischargeComponentClassName,
    setScrollableDischargeComponentClassName,
  ] = useState<string | undefined>();
  const resetData = () => {
    setDischargeRequestData(getDeepClone(defaultDischargeRequestData));
    setPatientAdmissionTypeActive(false);
    setIsHandleChangeTriggered(false);
    setDeletedDischargeRequestDocuments([]);
    setDischargeRequestDocuments([]);
    setDischargeReqAttestation(dischargeRequestAttest);
    setDischargeRequestPageSection(
      DischargeRequestionPageSection.DISCHARGE_REQUEST_FORM
    );
    setIsPreviousClicked(false);
    setPdfUrls([]);
  };
  const [patientAdmissionTypeActive, setPatientAdmissionTypeActive] = useState<
    boolean | null
  >(null);
  const [dischargeRequestPageSection, setDischargeRequestPageSection] =
    useState<DischargeRequestionPageSection>(
      DischargeRequestionPageSection.DISCHARGE_REQUEST_FORM
    );
  const [dischargeReqAttestation, setDischargeReqAttestation] =
    useState<IAttestationAndSign>(woundAssessmentAttest);
  const [isPreviousClicked, setIsPreviousClicked] = useState(false);
  const [woundInfoDetails, setWoundInfoDetails] = useState<any>(null);
  const [pdfUrls, setPdfUrls] = useState<string[]>([]);

  return (
    <DischargeRequestContext.Provider
      value={{
        dischargeRequestData,
        setDischargeRequestData,
        resetData,
        patientAdmissionTypeActive,
        setPatientAdmissionTypeActive,
        dischargeRequestDocuments,
        setDischargeRequestDocuments,
        deletedDischargeRequestDocuments,
        setDeletedDischargeRequestDocuments,
        isHandleChangeTriggered,
        setIsHandleChangeTriggered,
        errorInUploadFiles,
        setErrorInUploadFiles,
        dischargeRequestPageSection,
        setDischargeRequestPageSection,
        scrollableDischargeComponentClassName,
        setScrollableDischargeComponentClassName,
        isPreviousClicked,
        setIsPreviousClicked,
        dischargeReqAttestation,
        setDischargeReqAttestation,
        woundInfoDetails,
        setWoundInfoDetails,
        pdfUrls,
        setPdfUrls,
      }}
    >
      {children}
    </DischargeRequestContext.Provider>
  );
};
