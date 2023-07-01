import "./manageProfile.css";
import { Grid } from "@mui/material";
import { format } from "react-string-format";
import { defaultProfileData } from "./manageProfile.model";
import React, { useState, useEffect, useContext } from "react";
import { IManageProfile, IManageProfileProps } from "./manageProfile.interface";
import { AccountInformation } from "./accountInformation/accountInformation.component";
import { FacilityInformation } from "./facilityInformation/facilityInformation.component";
import CommunicationPreferences from "./communicationPreferences/communicationPrefrences.component";
import { EmailNotificationPreference } from "./emailNotificationPreference/emailNotificationPreference.component";
import {
  CMS_SMS_CONTENT,
  DD_DEPARTMENT_CONTENT,
  DD_LICENSE_CONTENT,
} from "../../util/staticText";
import { ManageProfileValidator } from "./manageProfile.validator";
import { FooterButtonGroup } from "../authenticateProfile/footerButtonGroup/footerButtonGroup.component";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { getUserProfile } from "../../util/userService";
import { bindManageProfileData } from "../../util/utilityFunctions";
import {
  ProfileFormContext,
  ProfileFormContextType,
} from "../../context/ProfileFormContext";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { IFacility } from "./facilityInformation/facility.interface";
import { LoadingSpinner } from "../../core/loader/LoadingSpinner";
import ContactInfoManageProfile from "./contactInformationManageProfile/contactInfoManageProfile.component";
import { ValidationStatus } from "../../core/interfaces/input.interface";
import { IUser } from "./user.interface";
import { searchFacility } from "./facilityInformation/addFacility/addFacility.service";
import { IUserFacility } from "./user.interface";
import { getdropDownContent } from "../../util/dropDownService";
import {
  RolesPermissionContextType,
  RolesPermissionContext,
} from "../../context/RolesPermissionContext";

export const ManageProfile = ({
  DefaultManageProfileData = defaultProfileData,
  Validator = new ManageProfileValidator(),
  setProgbarVal,
}: IManageProfileProps) => {
  const profileForm = useContext<ProfileFormContextType | null>(
    ProfileFormContext
  );
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );

  const [tempManageProfileData, setTempManageProfileData] =
    React.useState<any>();
  const [validator] = useState(Validator);
  const smsTncConent = format("{0}/{1}", "/cmsContent", CMS_SMS_CONTENT ?? "");
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const [loaderSpinner, setloaderSpinner] = useState(false);
  const [licenseType, setLicenseType] = React.useState([]);
  const [department, setDepartment] = React.useState([]);
  let facilitylist: Array<IFacility> = [];

  useEffect(() => {
    if (!tempManageProfileData) {
      window.scrollTo(0, 0);
      profileForm?.setEditable(false);
      getUserData();
    } else {
      setTempManageProfileData(profileForm?.originalProfileDetails);
    }
  }, []);
  useEffect(() => {
    fetchdropDownContent();
  }, []);

  const fetchdropDownContent = async () => {
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

  const getUserData = async () => {
    profileForm?.setrenderManageProfile(false);
    setloaderSpinner(true);
    const user = await getUserProfile();
    if (user !== undefined) {
      authObj?.setUserProfile(user);

      const bindedData: IManageProfile = bindManageProfileData(
        user,
        profileForm!.profileDetails,
        validator
      );
      profileForm?.setProfileDetails(Object.assign({}, bindedData));
      profileForm?.setOriginalProfileDetails(Object.assign({}, bindedData));
      setTempManageProfileData(Object.assign({}, bindedData));
      updateCommunicationPreference(user);
      await updateFacilities(user);
      profileForm?.setTrashIconVisibility(facilitylist.length > 1);
      setloaderSpinner(false);
    } else {
      setloaderSpinner(false);
    }
  };

  const getUserfacilitiesDetails = async (
    reqParams: any,
    linkedFacility: IUserFacility
  ) => {
    const searchedFacilities = await searchFacility(reqParams);
    if (searchedFacilities && searchedFacilities.length > 0) {
      const facilityRes = searchedFacilities.filter((x: IFacility) => {
        if (
          linkedFacility.siteUseId &&
          x.siteUseId === linkedFacility.siteUseId.toString()
        ) {
          return x;
        }
      })[0];
      return facilityRes;
    }
  };

  const handleCommPrefEmailCheckbox = (e: any) => {
    const checked = e.target.checked;
    updateEmailCommunicationPreference(checked);
  };

  const handleCommPrefSmsCheckbox = (e: any) => {
    const checked = e.target.checked;
    updateSMSCheckBox(checked);
  };

  const handleCommPrefTncAcceptCheckbox = (e: any) => {
    const checked = e.target.checked;
    profileForm?.setProfileDetails(
      Object.assign({}, profileForm?.profileDetails, {
        smsTnCAccept: {
          value: checked ? "true" : "false",
          valid: checked ? ValidationStatus.VALID : ValidationStatus.UNTOUCHED,
          required: true,
        },
      })
    );
  };

  const handleKeepMeUpdatedCheckbox = (e: any) => {
    const checked = e.target.checked;
    profileForm?.setKeepMeUpdatedVal(checked);
  };

  const updateCommunicationPreference = (user: IUser) => {
    updateEmailCommunicationPreference(user.emailContactPreference);
    updateSMSCheckBox(user.smsContactPreference);
    const smsAccepted =
      user.smsContactPreference && user.smsTnCAcceptedDate !== null;
    profileForm?.setContInfoSmsDisabled(
      !(user.mobilePhoneNo !== null && user.mobilePhoneNo !== "")
    );
    profileForm?.setSmsAcceptDisabled(
      !(user.mobilePhoneNo !== null && user.mobilePhoneNo !== "") ||
        !user.smsContactPreference ||
        (user.smsContactPreference &&
          (user.smsTnCAcceptedDate !== null || user.smsTnCAcceptedDate !== ""))
        ? true
        : false
    );
    updateSMSCommunicationPreference(user.smsContactPreference, smsAccepted);
    profileForm?.setSmsTnCAcceptedDate(user.smsTnCAcceptedDate);
    profileForm?.setKeepMeUpdatedVal(user.keepMeUpdated);
    updateProfileDetailsPreference(user);
    profileForm?.setProfileDetails(
      Object.assign({}, profileForm?.profileDetails)
    );
  };

  const updateProfileDetailsPreference = (user: IUser) => {
    const emailPreference = user.emailContactPreference;
    const smsPreference = user.smsContactPreference;
    const smsAccepted =
      user.smsContactPreference && user.smsTnCAcceptedDate !== null;
    if (profileForm) {
      profileForm!.profileDetails.preferenceType = {
        value: emailPreference || smsPreference ? "true" : "false",
        valid:
          emailPreference || smsPreference
            ? ValidationStatus.VALID
            : ValidationStatus.INVALID,
        required: true,
      };
      profileForm!.profileDetails.emailPreference = {
        value: emailPreference ? "true" : "false",
        valid: emailPreference
          ? ValidationStatus.VALID
          : ValidationStatus.UNTOUCHED,
        required: emailPreference,
      };
      profileForm!.profileDetails.smsPreference = {
        value: smsPreference ? "true" : "false",
        valid: smsPreference
          ? ValidationStatus.VALID
          : ValidationStatus.UNTOUCHED,
        required: smsPreference,
      };
      profileForm!.profileDetails.smsTnCAccept = {
        value: smsAccepted ? "true" : "false",
        valid: smsAccepted
          ? ValidationStatus.VALID
          : ValidationStatus.UNTOUCHED,
        required: smsPreference,
      };
      profileForm!.setProfileDetails(
        Object.assign({}, profileForm!.profileDetails)
      );
    }
  };

  const updateEmailCommunicationPreference = (emailPreference: boolean) => {
    if (profileForm) {
      profileForm!.profileDetails.emailPreference = {
        value: emailPreference ? "true" : "false",
        valid: emailPreference
          ? ValidationStatus.VALID
          : ValidationStatus.UNTOUCHED,
        required: emailPreference,
      };
    }
    updatePreferenceType(emailPreference, null);
    profileForm?.setProfileDetails(
      Object.assign({}, profileForm?.profileDetails)
    );
  };

  const updateSMSCheckBox = (checked: boolean) => {
    profileForm?.setSmsAcceptDisabled(!checked);
    updateSMSCommunicationPreference(checked, checked ? null : checked);
  };

  const updateSMSCommunicationPreference = (
    smsPreferenceVal: boolean | null,
    smsAcceptedVal: boolean | null
  ) => {
    if (profileForm) {
      const smsPreference =
        smsPreferenceVal !== null
          ? smsPreferenceVal
          : profileForm!.profileDetails.smsPreference.value === "true";
      const smsAccepted =
        smsAcceptedVal !== null
          ? smsAcceptedVal
          : profileForm!.profileDetails.smsTnCAccept.value === "true";
      profileForm!.profileDetails.smsPreference = {
        value: smsPreference ? "true" : "false",
        valid: smsPreference
          ? ValidationStatus.VALID
          : ValidationStatus.UNTOUCHED,
        required: smsPreference,
      };
      profileForm!.profileDetails.smsTnCAccept = {
        value: smsAccepted ? "true" : smsPreference ? "false" : "",
        valid: smsAccepted
          ? ValidationStatus.VALID
          : ValidationStatus.UNTOUCHED,
        required: smsPreference,
      };
      updatePreferenceType(null, smsPreference);
      profileForm!.setProfileDetails(
        Object.assign({}, profileForm!.profileDetails)
      );
    }
  };

  const updatePreferenceType = (
    emailPreferenceVal: boolean | null,
    smsPreferenceVal: boolean | null
  ) => {
    if (profileForm) {
      const emailPreference =
        emailPreferenceVal === null
          ? profileForm!.profileDetails.emailPreference.value === "true"
          : emailPreferenceVal;
      const smsPreference =
        smsPreferenceVal === null
          ? profileForm!.profileDetails.smsPreference.value === "true"
          : smsPreferenceVal;
      profileForm!.profileDetails.preferenceType = {
        value: emailPreference || smsPreference ? "true" : "false",
        valid:
          emailPreference || smsPreference
            ? ValidationStatus.VALID
            : ValidationStatus.INVALID,
        required: true,
      };
    }
  };

  const updateFacilities = async (user: IUser) => {
    for (let i = 0; i < user.facilities.length; i++) {
      const userFacObj = user.facilities[i];
      if (userFacObj) {
        if (userFacObj.siteUseId && userFacObj.siteUseId !== "") {
          let reqParams = {
            customerNumber: userFacObj.number,
            siteUseId: userFacObj.siteUseId,
          };
          const facilityObj = await getUserfacilitiesDetails(
            reqParams,
            userFacObj
          );
          if (facilityObj) {
            let facility: IFacility = {
              accountId: facilityObj.accountId,
              accountName: facilityObj.accountName,
              typeName: facilityObj.typeName,
              addressId: facilityObj.addressId,
              address1: facilityObj.address1,
              address2: facilityObj.address2,
              city: facilityObj.city,
              state: facilityObj.state,
              zip: facilityObj.zip,
              accountNumber: facilityObj.accountNumber,
              typeCode: facilityObj.typeCode,
              siteUseId: facilityObj.siteUseId ?? "",
              careGiverId: facilityObj.careGiverId
                ? facilityObj.careGiverId
                : userFacObj.careGiverId
                ? userFacObj.careGiverId
                : null,
            };
            facilitylist.push(facility);
          }
        } else {
          let facility: IFacility = {
            accountId: "",
            accountName: userFacObj.facilityName,
            typeName: userFacObj.typeName,
            addressId: userFacObj.msAddressId
              ? `${userFacObj.msAddressId}`
              : "",
            address1: userFacObj.address1,
            address2: userFacObj.address2,
            city: userFacObj.city,
            state: userFacObj.state,
            zip: Number(userFacObj.zipCode),
            accountNumber: null,
            typeCode: userFacObj.typeCode,
            siteUseId: userFacObj.siteUseId ?? "",
            careGiverId: userFacObj.careGiverId ?? null,
          };
          facilitylist.push(facility);
        }
      }
    }
    profileForm?.setRegisteredFacility(facilitylist);
  };

  const Spinner = () => {
    return (
      <div className="manageProfile-loading">
        <div className="manageProfile-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };

  const manageProfile = () => {
    return (
      <>
        <div className="manage-profile">
          <>
            {authObj && !authObj.isInternalUser && (
              <div>
                <h2
                  className="manage-profile-title"
                  data-testid="manage-profile-title"
                >
                  Edit user profile
                </h2>
                <AccountInformation
                  data={profileForm?.profileDetails}
                  Validator={validator}
                  setData={profileForm?.setProfileDetails}
                  licenseType={licenseType}
                  department={department}
                />
                <ContactInfoManageProfile
                  data={profileForm?.profileDetails}
                  Validator={validator}
                  setData={profileForm?.setProfileDetails}
                  tempData={tempManageProfileData}
                  setTempData={setTempManageProfileData}
                />
                <div className="facilityinformation">
                  <h2 className="manage-profile-header-more-margin">
                    Facility information
                  </h2>
                  {
                    <FacilityInformation
                      showtrash={profileForm?.trashIconVisibility}
                      //send one value
                    />
                  }
                </div>

                <Grid
                  className="communication-preferences"
                  data-testid="communication-preferences"
                >
                  <CommunicationPreferences
                    formType="manageprofile"
                    data={profileForm?.profileDetails}
                    onEmailCheckboxClick={handleCommPrefEmailCheckbox}
                    onSmsCheckboxClick={(e) => handleCommPrefSmsCheckbox(e)}
                    smsCheckboxDisabled={profileForm?.contInfoSmsDisabled}
                    onAcceptTncClick={handleCommPrefTncAcceptCheckbox}
                    tncAcceptDisabled={profileForm?.smsAcceptDisabled}
                    tncAcceptChecked={
                      profileForm?.profileDetails.smsTnCAccept.value ===
                        "true" ?? false
                    }
                    toTncPath={smsTncConent}
                    smsChecked={
                      profileForm?.profileDetails.smsPreference.value ===
                        "true" ?? false
                    }
                    emailChecked={
                      profileForm?.profileDetails.emailPreference.value ===
                        "true" ?? false
                    }
                    onKeepMeUpdatedValue={profileForm?.keepMeUpdatedVal}
                    setIsTnCOpen={() => {
                      profileForm?.setIsTnCOpen(true);
                    }}
                  />
                </Grid>

                <EmailNotificationPreference
                  manageProfileData={profileForm?.profileDetails}
                  Validator={validator}
                  setManageProfileData={profileForm?.setProfileDetails}
                />
                <div id="mp-recaptcha-container"></div>
                <GoogleReCaptchaProvider
                  reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITEKEY ?? ""}
                  scriptProps={{ async: true, defer: true, appendTo: "body" }}
                  container={{
                    element: "mp-recaptcha-container",
                    parameters: {
                      badge: "inline",
                    },
                  }}
                >
                  <FooterButtonGroup
                    button1Text="Cancel"
                    button2Text="Save"
                    data={profileForm?.profileDetails}
                    Validator={validator}
                    toPath="/home"
                    setData={profileForm?.setProfileDetails}
                    pathType="manageprofile"
                    setProgbarVal={setProgbarVal}
                  />
                </GoogleReCaptchaProvider>
              </div>
            )}
          </>
        </div>
      </>
    );
  };

  return <>{loaderSpinner ? Spinner() : manageProfile()}</>;
};
