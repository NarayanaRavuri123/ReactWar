import { HubConnection } from "@microsoft/signalr";
import React, { createContext, useState } from "react";
import { IPatient } from "../components/myPatients/patient.interface";
import { MyPatientModalSection } from "../components/myPatients/patientOrdersDetails/patientOrdersDetails.component";
import { IDropZoneDocumentSelect } from "../core/customDropZone/dropZoneDocumentSelect.interface";

export type MyPatientContextType = {
  reloadMyPatient: boolean | null;
  setReloadMyPatient: React.Dispatch<React.SetStateAction<boolean | null>>;
  openPatientOrderAndDetail: boolean;
  setOpenPatientOrderAndDetail: React.Dispatch<React.SetStateAction<boolean>>;
  myPatientClickModalSection: MyPatientModalSection;
  setMyPatientClickModalSection: React.Dispatch<
    React.SetStateAction<MyPatientModalSection>
  >;
  hubConnection: HubConnection | undefined;
  setHubConnection: React.Dispatch<
    React.SetStateAction<HubConnection | undefined>
  >;
  patientOrderStatus: string | undefined;
  setPatientOrderStatus: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  uploadDocuments: IDropZoneDocumentSelect[];
  setUploadDocuments: React.Dispatch<
    React.SetStateAction<IDropZoneDocumentSelect[]>
  >;
  orderId: string | null | undefined;
  setorderId: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  orderLockedByFullName: string | null | undefined;
  setorderLockedByFullName: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  isPatientLocked: boolean;
  setIsPatientLocked: React.Dispatch<React.SetStateAction<boolean>>;
  isPatientLockedChecked: boolean;
  setIsPatientLockedChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

type MyPatientContextProviderProps = {
  children: React.ReactNode;
};

export const MyPatientContext = createContext<MyPatientContextType | null>(
  null
);

export const MyPatientContextProvider = ({
  children,
}: MyPatientContextProviderProps) => {
  const [reloadMyPatient, setReloadMyPatient] = useState<boolean | null>(false);
  const [openPatientOrderAndDetail, setOpenPatientOrderAndDetail] =
    useState<boolean>(false);
  const [myPatientClickModalSection, setMyPatientClickModalSection] =
    useState<MyPatientModalSection>(MyPatientModalSection.LOAD_PATIENT);
  const [hubConnection, setHubConnection] = useState<
    HubConnection | undefined
  >();
  const [patientOrderStatus, setPatientOrderStatus] = useState<
    string | undefined
  >("");
  const [uploadDocuments, setUploadDocuments] = useState<
    IDropZoneDocumentSelect[]
  >([]);
  const [orderId, setorderId] = useState<string | null | undefined>();
  const [orderLockedByFullName, setorderLockedByFullName] = useState<
    string | null | undefined
  >();
  const [isPatientLocked, setIsPatientLocked] = useState(false);
  const [isPatientLockedChecked, setIsPatientLockedChecked] = useState(false);

  return (
    <MyPatientContext.Provider
      value={{
        reloadMyPatient,
        setReloadMyPatient,
        openPatientOrderAndDetail,
        setOpenPatientOrderAndDetail,
        myPatientClickModalSection,
        setMyPatientClickModalSection,
        hubConnection,
        setHubConnection,
        patientOrderStatus,
        setPatientOrderStatus,
        uploadDocuments,
        setUploadDocuments,
        orderId,
        setorderId,
        orderLockedByFullName,
        setorderLockedByFullName,
        isPatientLocked,
        setIsPatientLocked,
        isPatientLockedChecked,
        setIsPatientLockedChecked,
      }}
    >
      {children}
    </MyPatientContext.Provider>
  );
};
