import React, { useContext } from "react";
import "./contactInfoManageProfile.css";
import { IContactInformationInterface } from "../contactInformation/contactInformation.interface";
import {
  ProfileFormContext,
  ProfileFormContextType,
} from "../../../context/ProfileFormContext";
import ContactInfoNonEdit from "./contactInfoNonEdit/contactInfoNonEdit.component";
import ContactInfoEdit from "./contactInfoEdit/contactInfoEdit.component";

const ContactInfoManageProfile = ({
  Validator,
  data,
  setData,
  tempData,
  setTempData,
}: IContactInformationInterface) => {
  const profileForm = useContext<ProfileFormContextType | null>(
    ProfileFormContext
  );
  return (
    <div className="contact-information-mp">
      <h2
        className="contact-information-header-mp"
        data-testid="contact-information-mp"
      >
        Contact information
      </h2>
      <div className="emailTitle-mp">Email Address</div>
      <div className="emailValue-mp">{data?.email.value}</div>
      {!profileForm?.editable ? (
        <ContactInfoNonEdit data={data} />
      ) : (
        <ContactInfoEdit
          data={data}
          Validator={Validator}
          setData={setData}
          tempData={tempData}
          setTempData={setTempData}
        />
      )}
    </div>
  );
};

export default ContactInfoManageProfile;
