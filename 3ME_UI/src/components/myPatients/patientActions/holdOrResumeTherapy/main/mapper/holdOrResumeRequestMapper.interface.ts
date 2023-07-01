export interface IHoldOrResumeTherapyRequest {
  assessmentStatus: number;
  comments: string;
  dob: string;
  reason: string | null;
  rentalOrderNumber: string;
  siteUseId: string;
  therapyStartDate: string | null;
  woundDetails: any;
}

export interface IWoundInformationRequest {
  depth: number;
  evaluationDate: string;
  holdDate: string | null;
  id: number;
  length: number;
  location: string;
  resumeDate: string | null;
  therapyHoldDate?: string;
  therapyResumptionDate?: string;
  type: string;
  width: number;
}
