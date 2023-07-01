import { createContext, useState } from "react";
import { getDeepClone } from "../util/ObjectFunctions";
import { IPatient } from "../components/myPatients/patient.interface";
import { ISendNote } from "../components/send3MNote/sendNote.interface";
import { defaultSendNoteData } from "../components/send3MNote/sendNote.model";
import {
  IChangeAddress,
  PatientAddress,
} from "../components/send3MNote/changePatientAddress/changeAddress.interface";
import { IAskQuestion } from "../components/send3MNote/askQuestion/askQuestion.interface";
import { defaultAskQuestionData } from "../components/send3MNote/askQuestion/askQuestion.model";
import { ITransferPatient } from "../components/send3MNote/transferPatient/transferPatient.interface";
import { defaultAddressData } from "../components/send3MNote/changePatientAddress/changeAddress.model";
import { defaultTransferPatientData } from "../components/send3MNote/transferPatient/transferPatient.model";

export type SendNoteContextType = {
  patient: IPatient | null;
  setPatient: React.Dispatch<React.SetStateAction<IPatient | null>>;
  contactReasons: [];
  setContactReasons: React.Dispatch<React.SetStateAction<[]>>;
  contactReasonsText: [];
  setContactReasonsText: React.Dispatch<React.SetStateAction<[]>>;
  data: ISendNote;
  setData: React.Dispatch<React.SetStateAction<ISendNote>>;

  changeAddressData: IChangeAddress;
  setChangeAddressData: React.Dispatch<React.SetStateAction<IChangeAddress>>;
  patientCurrentAddress: PatientAddress | null;
  setPatientCurrentAddress: React.Dispatch<
    React.SetStateAction<PatientAddress | null>
  >;
  patientPermanentAddress: PatientAddress | null;
  setPatientPermanentAddress: React.Dispatch<
    React.SetStateAction<PatientAddress | null>
  >;
  transferPatientData: ITransferPatient;
  setTransferPatientData: React.Dispatch<
    React.SetStateAction<ITransferPatient>
  >;
  askQuestionData: IAskQuestion;
  setAskQuestionData: React.Dispatch<React.SetStateAction<IAskQuestion>>;

  resetSendNoteData: () => void;
};

type SendNoteContextProviderProps = {
  children: React.ReactNode;
};
export const SendNoteContext = createContext<SendNoteContextType | null>(null);

export const SendNoteContextProvider = ({
  children,
}: SendNoteContextProviderProps) => {
  const [patient, setPatient] = useState<IPatient | null>(null);
  const [contactReasons, setContactReasons] = useState<[]>([]);
  const [contactReasonsText, setContactReasonsText] = useState<[]>([]);
  const [data, setData] = useState<ISendNote>(
    getDeepClone(defaultSendNoteData)
  );
  const [changeAddressData, setChangeAddressData] = useState<IChangeAddress>(
    getDeepClone(defaultAddressData)
  );
  const [patientCurrentAddress, setPatientCurrentAddress] =
    useState<PatientAddress | null>(null);
  const [patientPermanentAddress, setPatientPermanentAddress] =
    useState<PatientAddress | null>(null);

  const [transferPatientData, setTransferPatientData] =
    useState<ITransferPatient>(getDeepClone(defaultTransferPatientData));
  const [askQuestionData, setAskQuestionData] = useState<IAskQuestion>(
    getDeepClone(defaultAskQuestionData)
  );

  const resetSendNoteData = () => {
    setPatient(null);
    setData(getDeepClone(defaultSendNoteData));
    setPatientCurrentAddress(null);
    setPatientPermanentAddress(null);
    setChangeAddressData(getDeepClone(defaultAddressData));
    setTransferPatientData(getDeepClone(defaultTransferPatientData));
    setAskQuestionData(getDeepClone(defaultAskQuestionData));
  };

  return (
    <SendNoteContext.Provider
      value={{
        patient,
        setPatient,

        contactReasons,
        setContactReasons,
        contactReasonsText,
        setContactReasonsText,

        data,
        setData,

        changeAddressData,
        setChangeAddressData,
        patientCurrentAddress,
        setPatientCurrentAddress,
        patientPermanentAddress,
        setPatientPermanentAddress,

        transferPatientData,
        setTransferPatientData,

        askQuestionData,
        setAskQuestionData,

        resetSendNoteData,
      }}
    >
      {children}
    </SendNoteContext.Provider>
  );
};