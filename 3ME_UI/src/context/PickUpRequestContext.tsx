import { createContext, useState } from "react";
import { getDeepClone } from "../util/ObjectFunctions";
import { IPatient } from "../components/myPatients/patient.interface";
import { IPickUpRequest } from "../components/pickUpAndDischargeRequest/pickUpRequest/pickUpRequest.interface";
import { defaultPickUpRequestData } from "../components/pickUpAndDischargeRequest/pickUpRequest/pickUpRequest.model";
import { PickUpRequestPageSection } from "../components/pickUpAndDischargeRequest/pickUpRequest/pickUpRequestPageSection.enum";
import React from "react";
import { ITransferPatient } from "../components/send3MNote/transferPatient/transferPatient.interface";
import { defaultTransferPatientData } from "../components/send3MNote/transferPatient/transferPatient.model";

export type PickUpRequestContextType = {
  pickUpRequestPage: PickUpRequestPageSection;
  setPickUpRequestPage: React.Dispatch<
    React.SetStateAction<PickUpRequestPageSection>
  >;
  data: IPickUpRequest;
  setData: React.Dispatch<React.SetStateAction<IPickUpRequest>>;
  resetData: () => void;
  patient: IPatient | null;
  setPatient: React.Dispatch<React.SetStateAction<IPatient | null>>;
  transferPatientDetail: ITransferPatient;
  setTransferPatientDetail: React.Dispatch<
    React.SetStateAction<ITransferPatient>
  >;
};

type PickUpRequestContextProviderProps = {
  children: React.ReactNode;
};

export const PickUpRequestContext =
  createContext<PickUpRequestContextType | null>(null);

export const PickUpRequestContextProvider = ({
  children,
}: PickUpRequestContextProviderProps) => {
  const [pickUpRequestPage, setPickUpRequestPage] =
    useState<PickUpRequestPageSection>(
      PickUpRequestPageSection.PICK_UP_REQUEST_START_FORM
    );
  const [data, setData] = useState<IPickUpRequest>(
    getDeepClone(defaultPickUpRequestData)
  );
  const [patient, setPatient] = useState<IPatient | null>(null);
  const [transferPatientDetail, setTransferPatientDetail] =
    useState<ITransferPatient>(getDeepClone(defaultTransferPatientData));
  const resetData = () => {
    setData(getDeepClone(defaultPickUpRequestData));
    setTransferPatientDetail(getDeepClone(defaultTransferPatientData));
  };

  return (
    <PickUpRequestContext.Provider
      value={{
        data,
        setData,
        resetData,
        patient,
        setPatient,
        pickUpRequestPage,
        setPickUpRequestPage,
        transferPatientDetail,
        setTransferPatientDetail,
      }}
    >
      {children}
    </PickUpRequestContext.Provider>
  );
};
