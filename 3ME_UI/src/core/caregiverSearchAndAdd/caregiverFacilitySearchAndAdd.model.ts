import { MouseEventHandler } from "react";
import { IInputField } from "../interfaces/input.interface";

export enum FacilityMode {
  LINKED = 0,
  MANUAL = 1,
}

export interface ICaregiverFacility {
  address1: string;
  address2: string;
  city: string;
  country?: string;
  customerAccountNumber?: string;
  customerName: string;
  marketingSegmentCode?: string;
  marketingSegmentDescription: string;
  origSystemReference?: string;
  phoneNo: string;
  extension: string;
  postalCode: string;
  siteUseId?: string;
  state: string;
  status?: string;
}

export interface IFacilitySearchAndAdd {
  facilities: ICaregiverFacility[];
}

export interface IFacilitySearchProps {
  handleSearch: MouseEventHandler<HTMLButtonElement>;
  redirectToProviderSearch: MouseEventHandler<HTMLButtonElement>;
  data: IFacilitySearch;
  setData: React.Dispatch<React.SetStateAction<IFacilitySearch>>;
  statesText: any;
}
export interface IFacilitySearch {
  facilityName: IInputField;
  facilityState: IInputField;
  facilityID: IInputField;
}
export interface ICaregiverFacilitySearchRequest {
  customerAccountNumber: string;
  customerName: string;
  state: string;
}

export interface IFacilityFoundList {
  facilities: ICaregiverFacility[];
  handleSelect: (item: ICaregiverFacility) => void;
  handleBackToSearch: MouseEventHandler<HTMLButtonElement>;
}

export interface IFacilityNotFound {
  handleSearchAgain: MouseEventHandler<HTMLButtonElement>;
  handleAddNewProvider: MouseEventHandler<HTMLButtonElement>;
}
