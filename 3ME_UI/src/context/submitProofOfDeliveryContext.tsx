import { createContext, useState } from "react";
import { IPatient } from "../components/myPatients/patient.interface";
import React from "react";
import { IDropZoneDocumentSelect } from "../core/customDropZone/dropZoneDocumentSelect.interface";

export type SubmitProofOfDeliveryContextType = {
  patient: IPatient | null;
  setPatient: React.Dispatch<React.SetStateAction<IPatient | null>>;
  proofOfDeliveryUploadDocs: IDropZoneDocumentSelect[];
  setProofOfDeliveryUploadDocs: React.Dispatch<
    React.SetStateAction<IDropZoneDocumentSelect[]>
  >;
  fileStatus: String;
  setFileStatus: Function;
  isUploadFaxActive: string[];
  setIsUploadFaxActive: React.Dispatch<React.SetStateAction<string[]>>;
  resetData: () => void;
};

type SubmitProofOfDeliveryContextProviderProps = {
  children: React.ReactNode;
};

export const SubmitProofOfDeliveryContext =
  createContext<SubmitProofOfDeliveryContextType | null>(null);

export const SubmitProofOfDeliveryContextProvider = ({
  children,
}: SubmitProofOfDeliveryContextProviderProps) => {
  const resetData = () => {
    setProofOfDeliveryUploadDocs([]);
    setFileStatus("");
    setIsUploadFaxActive([]);
  };
  const [patient, setPatient] = useState<IPatient | null>(null);
  const [proofOfDeliveryUploadDocs, setProofOfDeliveryUploadDocs] = useState<
    IDropZoneDocumentSelect[]
  >([]);
  const [fileStatus, setFileStatus] = useState<string>("Upload successful!");
  const [isUploadFaxActive, setIsUploadFaxActive] = useState<string[]>([]);
  return (
    <SubmitProofOfDeliveryContext.Provider
      value={{
        patient,
        setPatient,
        resetData,
        proofOfDeliveryUploadDocs,
        setProofOfDeliveryUploadDocs,
        fileStatus,
        setFileStatus,
        isUploadFaxActive,
        setIsUploadFaxActive,
      }}
    >
      {children}
    </SubmitProofOfDeliveryContext.Provider>
  );
};
