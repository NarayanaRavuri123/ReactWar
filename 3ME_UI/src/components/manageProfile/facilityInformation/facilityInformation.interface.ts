import { IFacility } from "./facility.interface";

export interface IFacilityInformationInterface {
  isRegistrationFlow?: boolean;
  showtrash ?: boolean;
  facilityList?: IFacility[]|null;
  
}
