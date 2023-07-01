export interface ISaveDischargeRequest {
  userName: string;
  patientFirstName: string;
  patientLastName: string;
  patientDOB: string;
  patientZipCode: string;
  patientRentalOrderNo: string;
  vacSerialNo: string;
  ProviderFacilityName: string;
  DiscontinuationDate: string;
  Submitter: ISubmitter;
  wounds: IDischargeRequestWound[];
  TherapyGoalAchieved: string;
  TherapyGoalNotAchieved: string;
  IsPatientExpired: boolean;
  IsPatientAdmittedToHigherLevelCare: boolean;
  IsReadmission: boolean | null;
  AdmittedToFacilityName: string;
  AdmittedToFacilityType: string;
  IsUnsceduledAdmission: boolean | null;
  IsAdmissionRelatedToWound: boolean | null;
  SignatureName: string;
  SignatureOn: string;
  Attestation: IAttestation;
}

export interface ISubmitter {
  FirstName: string;
  LastName: string;
  FacilityName: string;
  PhoneNumber: string;
  Title: string;
}

export interface IDischargeRequestWound {
  IsPrimary: boolean;
  MeasurementDate: string;
  Length: number;
  Width: number;
  Depth: number;
  WoundID: string;
  WoundType: string;
  WoundLocation: string;
  WoundOrientation: string;
  WoundDirection: string;
}

export interface IAttestation {
  Name: string;
  Employer: string;
  PhoneNumber: string;
  ConfirmationDate: string | null;
}
