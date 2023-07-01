import { IInputField } from "../../../core/interfaces/input.interface";
import { ContactUsValidator } from "./contactUs.validator";

export interface IContactUs {
  firstName: IInputField;
  subject: IInputField;
  lastName: IInputField;
  message: IInputField;
  phone: IInputField;
  extension: IInputField;
  email: IInputField;
  country: IInputField;
  shouldContact: IInputField;
}

export interface IContactUsProps {
  DefaultContactData?: IContactUs;
  Validator?: ContactUsValidator;
}
export interface IContactUsPhone {
  phoneNo: string;
}
