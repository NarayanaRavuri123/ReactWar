import React, { useContext } from "react";
import {
  ProfileFormContext,
  ProfileFormContextType,
} from "../../../../context/ProfileFormContext";
import { IManageProfile } from "../../manageProfile.interface";
import "../contactInfoManageProfile.css";

interface Props {
  data: IManageProfile | undefined;
}

const ContactInfoNonEdit = ({ data }: Props) => {
  const contInfoRegForm = useContext<ProfileFormContextType | null>(
    ProfileFormContext
  );

  const formatNumber = (inputNumber: any) => {
    let removeChar = inputNumber.replace(/[^a-zA-Z0-9]/g, "");
    return removeChar.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  };

  const displayPhone = () => {
    switch (data?.phoneType.value) {
      case "mobile":
        return formatNumber(data?.phone.value);
      case "phone":
        return `${formatNumber(data?.phone.value)} ${
          data?.extension.value.length === 3 ? ` x${data?.extension.value}` : ""
        }`;
      default:
        return "-";
    }
  };

  const handleEditable = () => {
    contInfoRegForm?.setEditable(true);
  };

  return (
    <div className="contactData-mp">
      <div>
        <div data-testid="phoneTitle-mp-test" className="phoneTitle-mp">
          Phone Number
        </div>
        <div className="emailValue-mp">{displayPhone()}</div>
      </div>
      <div className="phoneDetailType-mp">
        <div className="phoneType-mp">Phone type</div>
        <div className="phoneValue-mp">
          {data?.phoneType.value === "mobile" ? "Mobile" : "Landline"}
        </div>
      </div>
      <div
        data-testid="editPhone-mp-test"
        className="editPhone-mp"
        onClick={handleEditable}
      >
        Edit
      </div>
    </div>
  );
};

export default ContactInfoNonEdit;
