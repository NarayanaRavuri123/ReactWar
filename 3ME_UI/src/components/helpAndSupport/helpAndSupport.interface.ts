export interface IHelpAndSupport {
  authorizationForm: IHelpFile;
  orderPad: IHelpFile;
  letterofMedicalNecessity: IHelpFile;
  ePrescription: IHelpFile;
  readycareHelp: IHelpFile;
  systemRequirement: IHelpFile;
  mwhBroucher: IHelpFile;
  rentalReturnInstructions: IHelpFile;
  resourceTitle : string;
  printableFormTitle : string;
}

export interface IHelpFile {
  labelText: string;
  fileType: string;
  fileSize: string;
  description: string;
  fileLink: string;
}
