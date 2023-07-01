export interface IVacTherapyInformation {
  beefyBrightRedTissue: IWoundBedChild;
  dullPinkRedTissue: IWoundBedChild;
  whiteGreyYellowTissue: IWoundBedChild;
  blackEscharTissue: IWoundBedChild;
  bubbleInfo: IBubbleInfochild[];
  charityCarePdf: IcharityCareDetails;
}
export interface IWoundBedChild {
  LabelText: string;
  FileLink: string;
}
export interface IBubbleInfochild {
  section: string;
  sectionHeader: string;
  sectionContent: string;
}
export interface IcharityCareDetails {
  description: string | null;
  fileLink: string;
  fileSize: string;
  fileType: string;
  labelText: string;
  subObjectID: string | null;
}
