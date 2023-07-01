import { IInputField } from "../../../../core/interfaces/input.interface";

export interface ISearchFacilityByName {
  facilityName: IInputField;
  facilityState: IInputField;
  search: IInputField;
}

export interface ISearchFacilityByID {
  facilityID: IInputField;
  search: IInputField;
}

export interface IFacilitySearchRequest {
  customerName: string;
  postalCode?: string;
  state?: string;
  customerNumber: string;
}
