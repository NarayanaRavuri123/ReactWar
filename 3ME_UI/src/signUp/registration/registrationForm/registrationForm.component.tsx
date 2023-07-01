import "./registrationForm.css";
import { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { format } from "react-string-format";
import { IRegistrationInterface } from "./registrationForm.interface";
import { ContactInformation } from "../../../components/manageProfile/contactInformation/contactInformation.component";
import { AccountInformation } from "../../../components/manageProfile/accountInformation/accountInformation.component";
import { FacilityInformation } from "../../../components/manageProfile/facilityInformation/facilityInformation.component";
import { PasswordAdministration } from "../../../components/manageProfile/passwordAdministration/passwordAdministration.component";
import { passwordAdministrationConfigForRegistration } from "../../../constants/passwordAdministrationConfig";
import CommunicationPreferences from "../../../components/manageProfile/communicationPreferences/communicationPrefrences.component";
import {
  CMS_SMS_CONTENT,
  DD_DEPARTMENT_CONTENT,
  DD_LICENSE_CONTENT,
} from "../../../util/staticText";
import { FooterButtonGroup } from "../../../components/authenticateProfile/footerButtonGroup/footerButtonGroup.component";
import { ManageProfileValidator } from "../../../components/manageProfile/manageProfile.validator";
import { MessageToAdmin } from "../../../components/manageProfile/messageToAdmin/messageToAdmin.component";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import {
  ProfileFormContext,
  ProfileFormContextType,
} from "../../../context/ProfileFormContext";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { getdropDownContent } from "../../../util/dropDownService";

export const RegistrationForm = ({
  Validator = new ManageProfileValidator(),
  setProgbarVal,
}: IRegistrationInterface) => {
  const registrationForm = useContext<ProfileFormContextType | null>(
    ProfileFormContext
  );
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const smsTncConent = format("{0}/{1}", "/cmsContent", CMS_SMS_CONTENT ?? "");
  const [validator] = useState(Validator);
  const [licenseType, setLicenseType] = useState([]);
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    if (AuthObj?.profileSaveAuthicated === true) {
      registrationForm?.resetProfileForm();
      AuthObj?.setProfileSaveAuthicated(false);
    }
  }, []);

  const handleCommPrefEmailCheckbox = (e: any) => {
    const checked = e.target.checked;
    updateEmailCommunicationPreference(checked);
  };

  const handleCommPrefSmsCheckbox = (e: any) => {
    const checked = e.target.checked;
    updateSMSCheckBox(checked);
  };

  useEffect(() => {
    fetchdropDownContent();
  }, []);

  const fetchdropDownContent = async () => {
    //async and await
    try {
      const ddContent = format(
        "{0},{1}",
        DD_LICENSE_CONTENT,
        DD_DEPARTMENT_CONTENT ?? ""
      );
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const licenseObject = data.items.filter(
          (item: { name: string }) => item.name === DD_LICENSE_CONTENT
        );
        const licenseData = licenseObject[0].data
          .sort((a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
          )
          .map((x: { code: any }) => x.code);
        setLicenseType(licenseData);
        const departmentObject = data.items.filter(
          (item: { name: string }) => item.name === DD_DEPARTMENT_CONTENT
        );
        const departmentData = departmentObject[0].data
          .sort((a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
          )
          .map((x: { code: any }) => x.code);
        setDepartment(departmentData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCommPrefTncAcceptCheckbox = (e: any) => {
    const checked = e.target.checked;
    registrationForm?.setProfileDetails(
      Object.assign({}, registrationForm?.profileDetails, {
        smsTnCAccept: {
          value: checked ? "true" : "false",
          valid: checked ? ValidationStatus.VALID : ValidationStatus.INVALID,
          required: true,
        },
      })
    );
  };

  const handleKeepMeUpdatedCheckbox = (e: any) => {
    const checked = e.target.checked;
    registrationForm?.setKeepMeUpdatedVal(checked);
  };

  const updateEmailCommunicationPreference = (emailPreference: boolean) => {
    if (registrationForm) {
      registrationForm!.profileDetails.emailPreference = {
        value: emailPreference ? "true" : "false",
        valid: emailPreference
          ? ValidationStatus.VALID
          : ValidationStatus.UNTOUCHED,
        required: emailPreference,
      };
    }
    updatePreferenceType(emailPreference, null);
    registrationForm?.setProfileDetails(
      Object.assign({}, registrationForm?.profileDetails)
    );
  };

  const updateSMSCheckBox = (checked: boolean) => {
    registrationForm?.setSmsAcceptDisabled(!checked);
    updateSMSCommunicationPreference(checked, checked ? null : checked);
  };

  const updateSMSCommunicationPreference = (
    smsPreferenceVal: boolean | null,
    smsAcceptedVal: boolean | null
  ) => {
    if (registrationForm) {
      const smsPreference =
        smsPreferenceVal !== null
          ? smsPreferenceVal
          : registrationForm!.profileDetails.smsPreference.value === "true";
      const smsAccepted =
        smsAcceptedVal !== null
          ? smsAcceptedVal
          : registrationForm!.profileDetails.smsTnCAccept.value === "true";
      registrationForm!.profileDetails.smsPreference = {
        value: smsPreference ? "true" : "false",
        valid: smsPreference
          ? ValidationStatus.VALID
          : ValidationStatus.UNTOUCHED,
        required: smsPreference,
      };
      registrationForm!.profileDetails.smsTnCAccept = {
        value: smsAccepted ? "true" : smsPreference ? "false" : "",
        valid: smsAccepted
          ? ValidationStatus.VALID
          : smsPreference
          ? ValidationStatus.INVALID
          : ValidationStatus.UNTOUCHED,
        required: smsAccepted,
      };
      updatePreferenceType(null, smsPreference);
      registrationForm!.setProfileDetails(
        Object.assign({}, registrationForm!.profileDetails)
      );
    }
  };

  const updatePreferenceType = (
    emailPreferenceVal: boolean | null,
    smsPreferenceVal: boolean | null
  ) => {
    if (registrationForm) {
      const emailPreference =
        emailPreferenceVal === null
          ? registrationForm!.profileDetails.emailPreference.value === "true"
          : emailPreferenceVal;
      const smsPreference =
        smsPreferenceVal === null
          ? registrationForm!.profileDetails.smsPreference.value === "true"
          : smsPreferenceVal;
      registrationForm!.profileDetails.preferenceType = {
        value: emailPreference || smsPreference ? "true" : "false",
        valid:
          emailPreference || smsPreference
            ? ValidationStatus.VALID
            : ValidationStatus.INVALID,
        required: true,
      };
    }
  };

  return (
    <form autoComplete="off">
      <div className="registration-form" data-testid="registration-form">
        <div
          className="registration-form-header"
          data-testid="registration-form-header"
        >
          Enter contact information
        </div>
        <div className="registration-form-descripton">
          <span className="form-descripton" data-testid="form-descripton1">
            This portal is intended for use by clinicians in the United States.
          </span>
          <span className="form-descripton" data-testid="form-descripton2">
            <b> Note: </b> For further assistance, you may call our National
            Contact Center at (800) 275 - 4524 ext. 41858
          </span>
        </div>
        <AccountInformation
          data={registrationForm?.profileDetails}
          Validator={validator}
          setData={registrationForm?.setProfileDetails}
          licenseType={licenseType}
          department={department}
        />
        <ContactInformation
          isRegistrationFlow={true}
          data={registrationForm?.profileDetails}
          Validator={validator}
          setData={registrationForm?.setProfileDetails}
        />
        <PasswordAdministration
          configurationData={passwordAdministrationConfigForRegistration}
          data={registrationForm?.profileDetails}
          Validator={validator}
          setData={registrationForm?.setProfileDetails}
        />
        <Grid
          className="communication-preferences"
          data-testid="communication-preferences"
        >
          <CommunicationPreferences
            formType="registration"
            data={registrationForm?.profileDetails}
            onEmailCheckboxClick={handleCommPrefEmailCheckbox}
            onSmsCheckboxClick={(e) => handleCommPrefSmsCheckbox(e)}
            smsCheckboxDisabled={registrationForm?.contInfoSmsDisabled}
            onAcceptTncClick={handleCommPrefTncAcceptCheckbox}
            tncAcceptDisabled={registrationForm?.smsAcceptDisabled}
            tncAcceptChecked={
              registrationForm?.profileDetails.smsTnCAccept.value === "true" ??
              false
            }
            toTncPath={smsTncConent}
            smsChecked={
              registrationForm?.profileDetails.smsPreference.value === "true" ??
              false
            }
            emailChecked={
              registrationForm?.profileDetails.emailPreference.value ===
                "true" ?? false
            }
            setIsTnCOpen={() => {}}
          />
        </Grid>
        <div className="facilityinformation">
          <h2 className="manage-profile-header-more-margin">
            Facility information
          </h2>
          <FacilityInformation isRegistrationFlow={true} showtrash={true} />
        </div>
        <MessageToAdmin
          data={registrationForm?.profileDetails}
          Validator={validator}
          setData={registrationForm?.setProfileDetails}
        />
        <div id="recaptcha-container"></div>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITEKEY ?? ""}
          scriptProps={{ async: true, defer: true, appendTo: "body" }}
          container={{
            element: "recaptcha-container",
            parameters: {
              badge: "inline",
            },
          }}
        >
          <FooterButtonGroup
            pathType="registerpage"
            button1Text="Back"
            button2Text="Next"
            data={registrationForm?.profileDetails}
            setData={registrationForm?.setProfileDetails}
            Validator={validator}
            toPath="/signUp"
            setProgbarVal={setProgbarVal}
          />
        </GoogleReCaptchaProvider>
      </div>
    </form>
  );
};
