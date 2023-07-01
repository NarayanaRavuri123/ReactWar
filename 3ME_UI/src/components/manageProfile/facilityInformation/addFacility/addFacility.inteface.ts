import { Dispatch, SetStateAction } from "react";
import { IAddFacilityRedirect } from "../addFacilityContainer/addFacilityContainer.interface";
import {
  ISearchFacilityByID,
  ISearchFacilityByName,
} from "./searchFacility.interface";

export interface IAddFacility extends IAddFacilityRedirect {}

export interface ISearchFacilityByProps {
  facilitySearchDataForName: ISearchFacilityByName;
  setfacilitySearchDataForName: Dispatch<SetStateAction<ISearchFacilityByName>>;
  facilitySearchDataForID: ISearchFacilityByID;
  setfacilitySearchDataForID: Dispatch<SetStateAction<ISearchFacilityByID>>;
  onSubmit: () => void | {};
  isComingFromSelectAFacility?: boolean;
}
