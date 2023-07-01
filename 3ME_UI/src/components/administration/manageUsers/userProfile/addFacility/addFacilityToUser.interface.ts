import { MouseEventHandler } from "react";

export interface IFacilityToUserProps {
  addBtnAction: MouseEventHandler<HTMLButtonElement>;
  cancelBtnAction: MouseEventHandler<HTMLButtonElement>;
  deselectAllBtnAction: MouseEventHandler<HTMLButtonElement>;
  showSelectAllBtn: boolean;
  selectAllBtnAction: MouseEventHandler<HTMLButtonElement>;
  facilities: IFacilityToUser[];
  handleChange: Function;
  isAddBtnEnabled: boolean;
}

export interface IFacilityToUser {
  activityStauts: number | null;
  number: number | null;
  address1: string;
  address2: string | null;
  city: string;
  isSelected: boolean;
  isOriginalSelected: boolean;
  facilityAddressID: string;
  facilityName: string;
  siteUseId: string;
  state: string;
  zipCode: string;
}
