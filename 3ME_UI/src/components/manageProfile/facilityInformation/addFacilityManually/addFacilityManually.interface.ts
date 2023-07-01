import { IInputField } from "../../../../core/interfaces/input.interface";
import { AddFacilityManuallyValidator } from "./addFacilityManually.validator";
import { IFacility } from "../facility.interface";
import { SearchSection } from "../addFacilityContainer/addFacilityContainer.enum";

export interface IAddFacility {
  name: IInputField;
  type: IInputField;
  addressLine1: IInputField;
  addressLine2: IInputField;
  city: IInputField;
  state: IInputField;
  zipCode: IInputField;
  typeCode: IInputField;
  facilityMode: IInputField;
  siteUseId: IInputField;
}

export interface IAddFacilityManuallyInterface {
  redirectHandler: (
    changeSectionTo: SearchSection,
    searchData?: IFacility[]
  ) => void;
  facilityData?: IAddFacility;
  addNewFacility: Function;
  Validator?: AddFacilityManuallyValidator;
}
