import "./authenticateProfileSave.css";
import {
  ProfileFormContext,
  ProfileFormContextType,
} from "../../../context/ProfileFormContext";
import { useHistory } from "react-router-dom";
import React, { useContext, useState } from "react";
import { createUser, updateUser } from "../../../util/userService";
import { IAuthProfile } from "./authprofile.interface";
import { defaultAuthProfile } from "./authProfile.model";
import { Validator } from "../../../util/order.validations";
import { getDeepClone } from "../../../util/ObjectFunctions";
import { PatientInput } from "../../newOrder/newOrder.style";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import { getCodeValidateError } from "../../../util/utilityFunctions";
import {
  EmailCommunicationPreference,
  IUser,
  IUserFacility,
  IUserUpdate,
} from "../../manageProfile/user.interface";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { AuthContextType, AuthContext } from "../../../context/AuthContext";
import { generateAndSendCode, ValidateCode } from "../../../util/codeService";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import {
  FacilityMode,
  IFacility,
} from "../../manageProfile/facilityInformation/facility.interface";
import { AuthenticationType } from "./authenticationType.model";

type Props = {
  AuthType: string;
  setOpenAuthVerifyDialog: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  codeAttempt?: boolean;
  setAttempt?: any;
  failureMessage: React.Dispatch<React.SetStateAction<string>>;
  pathType: string;
};

export const AuthenticateProfileSave = ({
  AuthType,
  setOpenAuthVerifyDialog,
  data,
  codeAttempt,
  setAttempt,
  failureMessage,
  pathType,
}: Props) => {
  const history = useHistory();
  const [CodeValidator] = useState<Validator>(new Validator());
  const [authCode, setAuthCode] = useState<IAuthProfile>(
    getDeepClone(defaultAuthProfile)
  );
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const [codeValidateError, setCodeValidateError] = useState(false);
  const [codeValidateErrorDesp, setcodeValidateErrorDesp] = useState("");
  const profileForm = useContext<ProfileFormContextType | null>(
    ProfileFormContext
  );
  const [isLoading, setIsLoading] = useState(false);

  const onChangeCode = (e: any) => {
    const isValid = CodeValidator.validate(e.target.value, e.target.name);
    setAuthCode(
      Object.assign({}, authCode, {
        [e.target.name]: { value: e.target.value, valid: isValid?.status },
      })
    );
  };
  const onClickVerifyCode = () => {
    setCodeValidateError(false);
    validateOTP();
  };

  const RegenerateAndSendCode = () => {
    setAuthCode(
      Object.assign({}, authCode, {
        verifycode: { value: "", valid: ValidationStatus.UNTOUCHED },
      })
    );
    setCodeValidateError(false);
    generateAndSendCodeService(AuthType);
  };

  const validateOTP = () => {
    validateOTPService(AuthType);
  };

  const validateOTPService = async (authType: string) => {
    let reqParams;
    reqParams = {
      mode: authType === "email" ? 0 : 1,
      code: authCode?.verifycode.value,
      email: authType === "email" ? data?.email.value : "",
      phoneNumber:
        authType !== "email"
          ? data?.phone.value.replace(/\s/g, "").replace(/[()-]/g, "")
          : "",
    };
    try {
      setIsLoading(true);
      const result = await ValidateCode(reqParams);
      if (result.succeeded) {
        if (pathType === "manageprofile") {
          setOpenAuthVerifyDialog(false);
          AuthObj?.setProfileSaveAuthicated(true);
          updateUserdetails();
        } else {
          registerUser();
        }
      } else {
        setIsLoading(false);
        setCodeValidateError(true);
        setcodeValidateErrorDesp(getCodeValidateError(result.error.errorCode));
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const generateAndSendCodeService = async (authType: string) => {
    let reqParams;
    reqParams = {
      mode: authType === "email" ? 0 : 1,
      userName: data?.userName.value,
      email: authType === "email" ? data?.email.value : "",
      phoneNumber: authType !== "email" ? data?.phone.value : "",
      type:
        pathType === "manageprofile"
          ? AuthenticationType.UPDATE_PROFILE
          : AuthenticationType.REGISTERATION,
      firstName: AuthObj?.userProfile?.firstName,
    };
    try {
      setIsLoading(true);
      const result = await generateAndSendCode(reqParams);
      if (result.succeeded) {
        setAttempt(false);
        setIsLoading(false);
      } else {
        setCodeValidateError(true);
        setIsLoading(false);
        setcodeValidateErrorDesp(getCodeValidateError(result.error.errorCode));
      }
    } catch (error) {}
  };

  const registerUser = async () => {
    const extensionNumber = data?.extension.value
      ? ` ext: ${data?.extension.value}`
      : "";
    const phoneNumber =
      data?.phoneType.value === "phone"
        ? `${data?.phone.value}${extensionNumber}`
        : "";
    const mobileNumber =
      data?.phoneType.value === "mobile" ? data?.phone.value : "";
    const emailPreference =
      profileForm?.profileDetails.emailPreference.value === "true" ?? false;
    const smsPreference =
      profileForm?.profileDetails.smsPreference.value === "true" ?? false;
    let newUser: IUser = {
      emailAddress: data?.email.value,
      departmentName: data?.department.value,
      firstName: data?.firstName.value,
      lastName: data?.lastName.value,
      userName: data?.userName.value,
      licenceType: data?.licenseType.value,
      messageToFacilityAdmin: data?.adminMessage.value,
      password: data?.newPassword.value,
      facilities: data?.facilityRegistered.value,
      title: data?.title.value,
      phoneNo: phoneNumber,
      extension: extensionNumber,
      mobilePhoneNo: mobileNumber,
      emailContactPreference: emailPreference,
      smsContactPreference: smsPreference,
      keepMeUpdated: profileForm?.keepMeUpdatedVal ?? false,
      smsTnCAcceptedDate: profileForm?.smsTnCAcceptedDate ?? null,
    };
    let facilities: IUserFacility[] = [];
    if (profileForm && profileForm.registeredFacility.length > 0) {
      profileForm.registeredFacility.map((rec: IFacility, index: number) => {
        const fac: IUserFacility = {
          number:
            rec.accountNumber !== null ? rec.accountNumber?.toString() : null,
          typeCode: rec.typeCode,
          typeName: rec.typeName,
          zipCode: rec.zip.toString(),
          mode: rec.facilityMode,
          address1: rec.address1,
          address2: rec.address2,
          city: rec.city,
          state: rec.state,
          facilityName:
            rec.facilityMode === FacilityMode.MANUAL ? rec.accountName : "",
          siteUseId: rec.siteUseId ? rec.siteUseId : "",
          careGiverId: rec.careGiverId ?? null,
        };
        facilities.push(fac);
      });
      newUser.facilities = facilities;
    }
    try {
      const result = await createUser(JSON.stringify(newUser));
      setIsLoading(false);
      if (!result.succeeded) {
        if (
          result.error.errorMessages[0].includes(
            "Password requirements were not met"
          )
        ) {
          failureMessage("User name cannot be part of your password.");
        } else {
          failureMessage(`${result.error.errorMessages}`);
        }
        setOpenAuthVerifyDialog(false);
      } else {
        setOpenAuthVerifyDialog(false);
        AuthObj?.setProfileSaveAuthicated(true);
        history.push("/success");
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const updateUserdetails = async () => {
    const emailPreference =
      profileForm?.profileDetails.emailPreference.value === "true" ?? false;
    const smsPreference =
      profileForm?.profileDetails.smsPreference.value === "true" ?? false;
    const smsAccepted =
      profileForm?.profileDetails.smsPreference.value === "true" ?? false;
    let updateUserObj: IUserUpdate = {
      firstName: data?.firstName.value,
      lastName: data?.lastName.value,
      userName: data?.userName.value,
      title: data?.title.value,
      departmentName: data?.department.value,
      licenceType: data?.licenseType.value,
      emailContactPreference: emailPreference,
      smsContactPreference: smsPreference,
      updateSMSTnCAcceptedDate: (smsPreference && smsAccepted) ?? false,
      smsTnCAcceptedDate: profileForm?.smsTnCAcceptedDate,
      keepMeUpdated: profileForm?.keepMeUpdatedVal ?? false,
      emailNotifications: [],
      facilities: [],
    };
    let facilities: IUserFacility[] = [];
    let emailNotifications: EmailCommunicationPreference[] = [];
    if (profileForm && profileForm.registeredFacility.length > 0) {
      const pickupval = data?.pickUpRequest?.value === "no" ? false : true;
      const rentalactval = data?.rentalActivity?.value === "no" ? false : true;
      const salesactval = data?.salesActivity?.value === "no" ? false : true;
      const pickupreques = {
        name: "RentalActivity: Home",
        value: rentalactval,
      };
      const rentalactivity = { name: "PickupRequest", value: pickupval };
      const salesActivity = { name: "SalesActivity", value: salesactval };
      emailNotifications.push(rentalactivity);
      emailNotifications.push(pickupreques);
      emailNotifications.push(salesActivity);
      profileForm.registeredFacility.map((rec: IFacility, index: number) => {
        const facilityMode = rec.addressId ? 0 : 1;
        const fac: IUserFacility = {
          number:
            rec.accountNumber !== null ? rec.accountNumber?.toString() : null,
          typeCode: rec.typeCode,
          typeName: rec.typeName,
          zipCode: rec.zip.toString(),
          mode: rec.addressId ? 0 : 1,
          address1: rec.address1,
          address2: rec.address2,
          city: rec.city,
          state: rec.state,
          facilityName:
            facilityMode === FacilityMode.MANUAL ? rec.accountName : "",
          siteUseId: rec.siteUseId ? rec.siteUseId : "",
          careGiverId: rec.careGiverId ?? null,
        };
        facilities.push(fac);
      });
      updateUserObj.facilities = facilities;
      updateUserObj.emailNotifications = emailNotifications;
    }
    profileForm?.setOriginalProfileDetails(profileForm.profileDetails);
    try {
      const result = await updateUser(JSON.stringify(updateUserObj));
      setIsLoading(false);
      if (result) {
        if (!result.succeeded) {
          failureMessage(`${result.error.errorMessages}`);
          setOpenAuthVerifyDialog(false);
        } else {
          setOpenAuthVerifyDialog(false);
          const linkedFacility = profileForm?.registeredFacility.filter(
            (x: IFacility) => x.addressId
          )[0];
          AuthObj?.setregisteredFaciltyAddress(linkedFacility);
          AuthObj?.setProfileSaveAuthicated(true);
          history.push("/success");
        }
      } else {
        setOpenAuthVerifyDialog(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const spinner = () => {
    return (
      <div className="authentication-loader">
        <LoadingSpinner />
      </div>
    );
  };

  const authPage = () => {
    return (
      <>
        <p className="sub-text">
          Verify you are the account holder using one of the authentication
          methods below
        </p>
        <ExpressButton
          clickHandler={RegenerateAndSendCode}
          parentClass="resendCode"
          variant="outlined"
        >
          Resend code to {AuthType}
        </ExpressButton>
        <p className="sub-text">
          Code {codeAttempt ? "sent" : "re-sent"}. If not received, resend code.
        </p>
        <InputWithLabel
          label="Verification code"
          testId="Verificationcode"
          isRequired={true}
          error={authCode?.verifycode.valid === ValidationStatus.INVALID}
        >
          <PatientInput
            autoFocus
            inputProps={{ "data-testid": "verifycode" }}
            name="verifycode"
            value={authCode?.verifycode.value}
            onChange={onChangeCode}
          />
        </InputWithLabel>
        {codeValidateError && (
          <span className="codeValidateError">{codeValidateErrorDesp}</span>
        )}
        <ExpressButton
          clickHandler={onClickVerifyCode}
          parentClass={
            authCode?.verifycode.valid === ValidationStatus.VALID
              ? "verify-code"
              : "verify-code-empty"
          }
          variant="contained"
        >
          Verify
        </ExpressButton>
      </>
    );
  };

  return (
    <div className="profile-save">
      <>
        <h3 className="header">Authentication</h3>
        {isLoading ? spinner() : authPage()}
      </>
    </div>
  );
};
