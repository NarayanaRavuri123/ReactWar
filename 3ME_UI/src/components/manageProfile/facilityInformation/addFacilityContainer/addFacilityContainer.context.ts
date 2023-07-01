import { createContext, MouseEventHandler } from "react";
import { Validator } from "../../../../util/order.validations";
import { IFacility } from "../facility.interface";

interface IAddFacilityContextContext {
  closePopup: MouseEventHandler<HTMLButtonElement>;
  facilitySearchValidator: Validator;
  addFacilityToList: (newPatient: IFacility) => void;
}

export const AddFacilityContext = createContext<IAddFacilityContextContext>({
  closePopup: () => {},
  facilitySearchValidator: new Validator(),
  addFacilityToList: () => {},
});
