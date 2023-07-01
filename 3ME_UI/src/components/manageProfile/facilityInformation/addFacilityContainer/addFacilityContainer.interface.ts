import { IFacility } from "../facility.interface";
import { SearchSection } from "./addFacilityContainer.enum";

export interface IAddFacilityRedirect {
  redirectHandler: (
    changeSectionTo: SearchSection,
    searchData?: IFacility[]
  ) => void;
  addNewFacility?: any;
  isForNewOrder?: boolean;
  isForAdminFlow?: boolean;
}

export interface IAddFacilityContainer {
  defaultPageSection?: SearchSection;
  isForNewOrder?: boolean;
  isForAdminFlow?: boolean;
}
