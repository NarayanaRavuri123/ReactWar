import {
  mockSendNoteData,
  mockSendNoteDataForAskQuestion,
  mockSendNoteDataForChangeAddress,
  mockSendNoteDataForTransferPatient,
} from "./sendNote.test.data";
import { patientMockData } from "../../../mockData/patientFound";
import { SendNoteContextType } from "../../../context/SendNoteContext";
import { askQuestioTestnData } from "../askQuestion/__test__/askQuestion.test.data";
import { changeAddressTestData } from "../changePatientAddress/__test__/changeAddress.test.data";
import { transferPatientTestData } from "../transferPatient/__test__/transferPatient.test.data";

export const getMockSendNoteData = (type: number = 0): SendNoteContextType => ({
  patient: patientMockData,
  setPatient: () => {},

  contactReasons: [],
  setContactReasons: () => {},
  contactReasonsText: [],
  setContactReasonsText: () => {},

  data:
    type === 1
      ? mockSendNoteDataForChangeAddress
      : type === 2
      ? mockSendNoteDataForTransferPatient
      : type === 3
      ? mockSendNoteDataForAskQuestion
      : mockSendNoteData,
  setData: () => {},

  changeAddressData: changeAddressTestData,
  setChangeAddressData: () => {},
  patientCurrentAddress: null,
  setPatientCurrentAddress: () => {},
  patientPermanentAddress: null,
  setPatientPermanentAddress: () => {},

  transferPatientData: transferPatientTestData,
  setTransferPatientData: () => {},

  askQuestionData: askQuestioTestnData,
  setAskQuestionData: () => {},

  resetSendNoteData: () => {},
});
