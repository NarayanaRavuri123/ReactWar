import { ReactNode, useContext, useEffect, useState } from "react";
import "../contactInfoManageProfile.css";
import {
  FormControlLabel,
  Grid,
  InputBase,
  Radio,
  RadioGroup,
} from "@mui/material";
import InputMask from "react-input-mask";
import {
  ProfileFormContext,
  ProfileFormContextType,
} from "../../../../context/ProfileFormContext";
import { IManageProfile } from "../../manageProfile.interface";
import { ManageProfileValidator } from "../../manageProfile.validator";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { UpdateContactInfoPopUpSection } from "../../contactInformation/popUpContainer.enum";
import { ReactComponent as RadioButtonIcon } from "../../../../assets/radioButton.svg";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../../assets/selectedRadioButton.svg";
import { AuthenticateViaEmailModal } from "../../contactInformation/authenticateViaEmailModal/authenticateViaEmailModal.component";
import { AuthenticateViaSmsModal } from "../../contactInformation/authenticateViaSmsModal/authenticateViaSmsModal.component";
import { SuccessModal } from "../../contactInformation/successModal/successModal.component";
import { ConfirmLeaveModal } from "../../contactInformation/confirmLeaveModal/confirmLeaveModal.component";
import { Popup } from "../../../../core/popup/popup.component";
import { LandlineWarningModal } from "../../contactInformation/landlineWarningModal/landlineWarningModal.compnent";
import { AuthContextType, AuthContext } from "../../../../context/AuthContext";
import { IUser } from "../../user.interface";
import { LoaderModal } from "../../contactInformation/loader/loaderModal.component";
import {
  checkUpdateContactInfoStatus,
  updateUserConfirmation,
  updateUserContactInfo,
  validateCode,
} from "../../../../util/userService";
import usePollingInterval from "../../../../core/customHooks/useInterval";
import { defaultAuthProfile } from "../../../authenticateProfile/saveProfile/authProfile.model";
import { IAuthProfile } from "../../../authenticateProfile/saveProfile/authprofile.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { FailureModal } from "../../contactInformation/failureModal/failureModal.component";
interface Props {
  data: IManageProfile | undefined;
  Validator?: ManageProfileValidator;
  setData: any;
  tempData?: any;
  setTempData?: any;
}

const ContactInfoEdit = ({
  data,
  Validator,
  setData,
  tempData,
  setTempData,
}: Props) => {
  const profileForm = useContext<ProfileFormContextType | null>(
    ProfileFormContext
  );
  const [extensionTemp, setExtensionTemp] = useState(data?.extension.value);
  const [phoneTypeTemp, setPhoneTypeTemp] = useState(data?.phoneType.value);
  const [phoneTemp, setPhoneTemp] = useState(
    data?.phone.value.replace(/[^a-zA-Z0-9]/g, "")
  );
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const [openLoaderPopUp, setOpenLoaderPopUp] = useState<boolean>(false);
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [validator] = useState<ManageProfileValidator>(Validator!);
  const [openChildPopUp, setOpenChildPopUp] = useState<boolean>(false);
  const [focusClasses, setFocusClasses] = useState({ message: "", phone: "" });
  const [contactInfoChanged, setContactInfoChanged] = useState(true);
  const [emailCode, setEmailCode] = useState<IAuthProfile>(
    getDeepClone(defaultAuthProfile)
  );
  const [smsCode, setSmsCode] = useState<IAuthProfile>(
    getDeepClone(defaultAuthProfile)
  );
  const [currentStatusCode, setCurrentStatusCode] = useState<number | null>(
    null
  );
  const [currentLastUpdatedTime, setCurrentLastUpdatedTime] = useState<
    string | null
  >(null);
  const [timeInterval, setTimeInterval] = useState<number | null>(null);
  const [pollingUrl, setPollingUrl] = useState<any | undefined>();
  const [instanceId, setInstanceId] = useState<string | undefined>();
  const [error, setError] = useState("");
  const [failureReason, setFailureReason] = useState("");

  usePollingInterval(() => {
    checkStatus();
  }, timeInterval);

  const updateConctInfo = async () => {
    profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.LOADER);
    const phoneNumber = data!.phone.value.split("-").join("");
    const type = data!.phoneType.value.toLowerCase() === "mobile" ? 1 : 2;
    const params = {
      PhoneNumber: phoneNumber,
      PhoneType: type,
      Extension:
        type === 1
          ? null
          : data!.extension.value !== ""
          ? data!.extension.value
          : null,
    };
    const reqBody = JSON.stringify(params);
    const response = await updateUserContactInfo(reqBody);
    if (!response) {
      setFailureReason("Oops something went wrong !");
      profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.FAILURE);
    } else {
      setInstanceId(response.id);
      setPollingUrl(response.statusQueryGetUri);
      setTimeInterval(1000);
      checkStatus();
    }
  };

  const validateOTPService = async (code: string) => {
    profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.LOADER);
    const params = {
      Mode: 3,
      Code: code,
    };
    const reqBody = JSON.stringify(params);
    try {
      const response = await validateCode(instanceId!, reqBody);
      if (response) {
        setTimeInterval(1000);
      } else {
        setError("Oops something went wrong !");
        if (currentStatusCode === 105) {
          profileForm?.setPopUpSection(
            UpdateContactInfoPopUpSection.AUTHENTICATE_VIA_EMAIL
          );
        } else if (currentStatusCode === 106) {
          profileForm?.setPopUpSection(
            UpdateContactInfoPopUpSection.AUTHENTICATE_VIA_SMS
          );
        }
      }
    } catch (error) {
      setFailureReason("Oops something went wrong !");
      profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.FAILURE);
      return console.log("error - ", error);
    }
  };

  const updateUserConfirmationService = async (userAccepted: boolean) => {
    profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.LOADER);
    const params = {
      Confirmed: userAccepted,
    };
    const reqBody = JSON.stringify(params);
    try {
      const response = await updateUserConfirmation(instanceId!, reqBody);
      if (response) {
        setTimeInterval(1000);
        profileForm?.setContInfoSmsDisabled(true);
        profileForm?.setSmsAcceptDisabled(true);
        const smsPreference =
          AuthObj?.userProfile?.smsContactPreference ?? false;
        const emailPreference =
          AuthObj?.userProfile?.emailContactPreference ?? false;
        setData((dt: IManageProfile) => ({
          ...dt,
          emailPreference: {
            value: "true",
            valid: ValidationStatus.VALID,
            required: emailPreference,
          },
          smsPreference: {
            value: "false",
            valid: ValidationStatus.UNTOUCHED,
            required: smsPreference,
          },
          smsTnCAccept: {
            value: "false",
            valid: ValidationStatus.UNTOUCHED,
            required: smsPreference,
          },
        }));
      } else {
        setError("Oops something went wrong !");
        profileForm?.setPopUpSection(
          UpdateContactInfoPopUpSection.AUTHENTICATE_VIA_SMS
        );
      }
    } catch (error) {
      setFailureReason("Oops something went wrong !");
      profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.FAILURE);
      return console.log("error - ", error);
    }
  };

  const checkStatus = async () => {
    if (pollingUrl) {
      let response = await checkUpdateContactInfoStatus(pollingUrl);
      switch (response.runtimeStatus) {
        case "Running":
          if (response.customStatus && response.customStatus.Code) {
            updateScreen(
              response.customStatus.Code,
              response.customStatus.Message,
              response.lastUpdatedTime
            );
          }
          break;
        case "Completed":
          setTimeInterval(null);
          if (response.customStatus && response.customStatus.Code) {
            updateScreen(
              response.customStatus.Code,
              response.customStatus.Message,
              response.lastUpdatedTime
            );
          }
          break;
        default:
          break;
      }
    }
  };

  const updateScreen = (
    status: number,
    message: string,
    lastUpdatedTime: string
  ) => {
    if (
      !currentLastUpdatedTime ||
      (currentStatusCode &&
        currentStatusCode !== status &&
        currentLastUpdatedTime &&
        currentLastUpdatedTime !== lastUpdatedTime)
    ) {
      let value = currentStatusCode;
      setCurrentStatusCode(status);
      setCurrentLastUpdatedTime(lastUpdatedTime);
      switch (status) {
        case 101:
          // SuccessMobileNumberUpdate
          profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.SUCCESS);
          break;
        case 102:
          // FailureMobileNumberUpdate
          setFailureReason(message);
          profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.FAILURE);
          break;
        case 103:
          // NotAValidOperation
          setFailureReason("Oops something went wrong !");
          profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.FAILURE);
          break;
        case 104:
          // UnableToSendVerificationCode
          setFailureReason(message);
          profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.FAILURE);
          break;
        case 105:
          // VerificationCodeHasSentViaEmail
          setTimeInterval(null);
          if (error) {
            setError("");
          }
          profileForm?.setPopUpSection(
            UpdateContactInfoPopUpSection.AUTHENTICATE_VIA_EMAIL
          );
          break;
        case 106:
          // VerificationCodeHasSentViaSMS
          setTimeInterval(null);
          if (error) {
            setError("");
          }
          profileForm?.setPopUpSection(
            UpdateContactInfoPopUpSection.AUTHENTICATE_VIA_SMS
          );
          break;
        case 107:
          // TimeOut
          setFailureReason("Oops something went wrong !");
          profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.FAILURE);
          break;
        case 108:
          // FailedToValidateCode
          setFailureReason("Oops something went wrong !");
          profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.FAILURE);
          break;
        case 109:
          // WarningToChangePreferenceToEmail
          setTimeInterval(null);
          profileForm?.setPopUpSection(
            UpdateContactInfoPopUpSection.LANDLINEWARNINGMODAL
          );
          break;
        case 110:
          // UserRejectedTheWorkflow
          handleCancelContactSave();
          break;
        case 111:
          // UnableToGetUserDetails
          setFailureReason("Oops something went wrong !");
          profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.FAILURE);
          break;
        case 117:
          // AuthenticationFailed
          setFailureReason("Oops something went wrong !");
          profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.FAILURE);
          break;
        case 119:
          // FailedToResetPassword
          setFailureReason("Oops something went wrong !");
          profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.FAILURE);
          break;
        case 120:
          // AuthenticationSuccessful
          profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.SUCCESS);
          break;
        case 121:
          // AuthenticationFailed
          setFailureReason("Oops something went wrong !");
          profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.FAILURE);
          break;
        case 1004:
        case 1005:
        case 1006:
          // VerificationCodeNotValid
          setTimeInterval(null);
          setError("Please enter valid code and try again.");
          if (value === 105) {
            profileForm?.setPopUpSection(
              UpdateContactInfoPopUpSection.AUTHENTICATE_VIA_EMAIL
            );
            setCurrentStatusCode(105);
          } else if (value === 106) {
            profileForm?.setPopUpSection(
              UpdateContactInfoPopUpSection.AUTHENTICATE_VIA_SMS
            );
            setCurrentStatusCode(106);
          }
          // setCurrentStatusCode(status);
          break;
        default:
          //  (ContactPreferenceSetToEmail = 112),
          //   (ContactPrefrenceSetToSMS = 113),
          //   (ContactPreferenceSetToEmailAndSMS = 114),
          //   (FailedToGetResetPasswordLink = 115),
          //   (ResetPasswordLink = 116),
          //   (InvalidChannel = 118),
          break;
      }
    }
  };

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const handleSuccessConatactSave = () => {
    profileForm?.setEditable(false);
    setOpenPopUp(false);
    resetAPIPollingDetails();
    setTimeout(() => {
      profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.NONE);
    }, 600);
  };

  const handleCancelContactSave = () => {
    updatePhoneDetails();
    resetAPIPollingDetails();
    updateProfileDetailsPreference();
    setData(Object.assign({}, data));
    profileForm?.setEditable(false);
    profileForm?.setIsLandlineSelected(data?.phoneType.value === "phone");
    profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.NONE);
  };

  const handleContactSave = () => {
    setOpenPopUp(true);
    updateConctInfo();
  };

  const handleSubmitBtnActionForEmailVerification = () => {
    validateOTPService(emailCode.verifycode.value);
  };

  const handleSubmitBtnActionForSmsVerification = () => {
    validateOTPService(smsCode.verifycode.value);
  };

  const handleChangePreferenceAsEmail = () => {
    updateUserConfirmationService(true);
  };

  const handleNoChangePreferenceAsEmail = () => {
    handleCancelContactSave();
  };

  const validateAndSetData = (e: any) => {
    if (
      e.target.name === "phone" &&
      data?.phone.valid === ValidationStatus.UNTOUCHED &&
      (e.target.value === "(___) ___-____" || e.target.value === "")
    ) {
      return;
    }
    if (e.target.name === "phoneType") {
      profileForm?.setContInfoSmsDisabled(
        e.target.value !== "" && e.target.value === "phone"
      );
      profileForm?.setIsLandlineSelected(e.target.value === "phone");
      profileForm?.setSmsAcceptDisabled(
        profileForm?.smsAcceptDisabled || profileForm?.contInfoSmsDisabled
      );
    }
    const isValid = validator.validate(e.target.value, e.target.name);
    setData(
      Object.assign({}, data, {
        [e.target.name]: {
          value: e.target.value,
          valid: isValid?.status,
          required: e.target.required,
        },
      })
    );
  };

  const updatePhoneDetails = () => {
    if (data) {
      data.extension = {
        value: extensionTemp ?? "",
        valid:
          extensionTemp?.length === 3
            ? ValidationStatus.VALID
            : ValidationStatus.UNTOUCHED,
        required: false,
      };
      data.phone = {
        value: tempData.phone.value,
        valid: tempData.phone.valid,
        required: tempData.phone.required,
      };
      data.phoneType = {
        value: tempData.phoneType.value,
        valid: tempData.phoneType.valid,
        required: tempData.phoneType.required,
      };
    }
  };

  const updateProfileDetailsPreference = () => {
    if (data && AuthObj && AuthObj.userProfile) {
      const emailPreference = AuthObj.userProfile.emailContactPreference;
      const smsPreference = AuthObj.userProfile.smsContactPreference;
      const smsAccepted =
        AuthObj.userProfile.smsContactPreference &&
        AuthObj.userProfile.smsTnCAcceptedDate !== null;
      data.preferenceType = {
        value: emailPreference || smsPreference ? "true" : "false",
        valid:
          emailPreference || smsPreference
            ? ValidationStatus.VALID
            : ValidationStatus.INVALID,
        required: true,
      };
      data.emailPreference = {
        value: emailPreference ? "true" : "false",
        valid: emailPreference
          ? ValidationStatus.VALID
          : ValidationStatus.UNTOUCHED,
        required: emailPreference,
      };
      data.smsPreference = {
        value: smsPreference ? "true" : "false",
        valid: smsPreference
          ? ValidationStatus.VALID
          : ValidationStatus.UNTOUCHED,
        required: smsPreference,
      };
      data.smsTnCAccept = {
        value: smsAccepted ? "true" : "false",
        valid: smsAccepted
          ? ValidationStatus.VALID
          : ValidationStatus.UNTOUCHED,
        required: smsPreference,
      };
      updateSMSandSMSAcceptCheckBox(AuthObj.userProfile);
    }
  };

  const updateSMSandSMSAcceptCheckBox = (user: IUser) => {
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
    profileForm?.setProfileDetails(
      Object.assign({}, profileForm?.profileDetails)
    );
  };

  const validateDataIsSame = () => {
    if (
      phoneTemp === data?.phone.value.replace(/[^a-zA-Z0-9]/g, "") &&
      phoneTypeTemp === data?.phoneType.value &&
      extensionTemp === data?.extension.value
    ) {
      setContactInfoChanged(true);
    } else {
      setContactInfoChanged(false);
    }
  };

  const resetAPIPollingDetails = () => {
    setEmailCode(getDeepClone(defaultAuthProfile));
    setSmsCode(getDeepClone(defaultAuthProfile));
    setCurrentStatusCode(null);
    setTimeInterval(null);
    setPollingUrl(undefined);
    setInstanceId(undefined);
    setError("");
  };

  const popupSection = () => {
    let page: ReactNode;
    switch (profileForm?.popUpSection) {
      case UpdateContactInfoPopUpSection.AUTHENTICATE_VIA_EMAIL:
        page = (
          <AuthenticateViaEmailModal
            code={emailCode}
            data={data}
            error={error}
            instanceId={instanceId}
            setCode={setEmailCode}
            submitBtnAction={handleSubmitBtnActionForEmailVerification}
          />
        );
        break;
      case UpdateContactInfoPopUpSection.AUTHENTICATE_VIA_SMS:
        const isOnlyEmailPreference =
          profileForm?.isOnlyEmailPreference ?? false;
        page = (
          <AuthenticateViaSmsModal
            code={smsCode}
            data={data}
            error={error}
            instanceId={instanceId}
            setCode={setSmsCode}
            submitBtnAction={handleSubmitBtnActionForSmsVerification}
            isOnlyEmailPreference={isOnlyEmailPreference}
          />
        );
        break;
      case UpdateContactInfoPopUpSection.SUCCESS:
        page = (
          <SuccessModal
            setTempData={setTempData}
            returnBtnAction={handleSuccessConatactSave}
          />
        );
        break;
      case UpdateContactInfoPopUpSection.FAILURE:
        page = (
          <FailureModal
            message={failureReason}
            returnBtnAction={handleCancelContactSave}
          />
        );
        break;
      case UpdateContactInfoPopUpSection.LANDLINEWARNINGMODAL:
        page = (
          <LandlineWarningModal
            setOpenPopUp={setOpenPopUp}
            handleChangeEmail={handleChangePreferenceAsEmail}
            handleCancel={handleNoChangePreferenceAsEmail}
          />
        );
        break;
    }
    return page;
  };

  const closeLoaderPopUpAction = () => {
    setOpenLoaderPopUp(false);
  };

  const closePopUpAction = () => {
    switch (profileForm?.popUpSection) {
      case UpdateContactInfoPopUpSection.AUTHENTICATE_VIA_EMAIL:
        setOpenChildPopUp(true);
        break;
      case UpdateContactInfoPopUpSection.AUTHENTICATE_VIA_SMS:
        setOpenChildPopUp(true);
        break;
      case UpdateContactInfoPopUpSection.SUCCESS:
        profileForm?.setEditable(false);
        setOpenPopUp(false);
        setOpenLoaderPopUp(false);
        setTimeout(() => {
          profileForm?.setPopUpSection(UpdateContactInfoPopUpSection.NONE);
        }, 600);
        resetAPIPollingDetails();
        break;
      case UpdateContactInfoPopUpSection.LANDLINEWARNINGMODAL:
        handleCancelContactSave();
        break;
      case UpdateContactInfoPopUpSection.FAILURE:
        handleCancelContactSave();
        break;
    }
  };

  useEffect(() => {
    setExtensionTemp(data?.extension.value);
    setPhoneTypeTemp(data?.phoneType.value);
    setPhoneTemp(data?.phone.value.replace(/[^a-zA-Z0-9]/g, ""));
  }, []);

  useEffect(() => {
    validateDataIsSame();
  }, [data?.phone.value, data?.phoneType.value, data?.extension.value]);

  useEffect(() => {
    switch (profileForm?.popUpSection) {
      case UpdateContactInfoPopUpSection.NONE:
        break;
      case UpdateContactInfoPopUpSection.LOADER:
        if (!openLoaderPopUp) {
          setTimeout(() => {
            setOpenLoaderPopUp(true);
          }, 100);
        }
        if (openPopUp) {
          setTimeout(() => {
            setOpenPopUp(false);
          }, 50);
        }
        break;
      default:
        if (openLoaderPopUp) {
          setOpenLoaderPopUp(false);
        }
        if (!openPopUp) {
          setTimeout(() => {
            setOpenPopUp(true);
          }, 100);
        }
        break;
    }
  }, [profileForm?.popUpSection]);

  return (
    <div className="editForm-mp">
      <Grid
        container
        spacing={1}
        classes={{ root: "contact-information-component-mp" }}
      >
        <Grid item xs={data?.phoneType.value === "phone" ? 4 : 6}>
          <InputWithLabel
            label="Phone Number"
            isRequired={data?.phone.required}
            error={data?.phone.valid === ValidationStatus.INVALID}
            labelClassName={focusClasses.phone}
            testId="phone-number-mp"
          >
            <InputMask
              required={data?.phone.required}
              placeholder="___-___-____"
              className="phone"
              name="phone"
              mask="999-999-9999"
              value={data?.phone.value}
              onChange={validateAndSetData}
              onFocus={(e) => setClasses(e, "Mui-focused")}
              onBlur={(e) => setClasses(e, "")}
            />
          </InputWithLabel>
        </Grid>
        <Grid item xs={data?.phoneType.value === "phone" ? 8 : 6}>
          <div className="phone-type-container-mp">
            <div className="radio-group-mp">
              {data?.phoneType.value === "phone" && (
                <div className="extension-mp">
                  <InputWithLabel
                    label="Extension"
                    isRequired={false}
                    error={data?.extension.valid === ValidationStatus.INVALID}
                    testId="extensionlabel-mp-test"
                  >
                    <InputBase
                      className="contact-information-input-mp"
                      name="extension"
                      value={data?.extension.value}
                      onChange={validateAndSetData}
                      inputProps={{ "data-testid": "extension-mp-test" }}
                    />
                  </InputWithLabel>
                </div>
              )}
              <InputWithLabel
                label="Phone type"
                isRequired={data?.phoneType.required}
                error={data?.phoneType.valid === ValidationStatus.INVALID}
                labelClassName="radio-title-label-mp"
              >
                <RadioGroup
                  name="phoneType"
                  classes={{ root: "radioRoot-mp" }}
                  value={data?.phoneType.value}
                  onChange={validateAndSetData}
                >
                  <FormControlLabel
                    classes={{ root: "optionRoot-mobile-mp" }}
                    componentsProps={{
                      typography: { classes: { root: "optiontxt-mp" } },
                    }}
                    value="mobile"
                    control={
                      <Radio
                        required={data?.phoneType.required}
                        icon={<RadioButtonIcon />}
                        checkedIcon={<SelectedRadioButtonIcon />}
                      />
                    }
                    label="Mobile"
                  />
                  <FormControlLabel
                    classes={{ root: "optionRoot-landline-mp" }}
                    componentsProps={{
                      typography: { classes: { root: "optiontxt-mp" } },
                    }}
                    value="phone"
                    control={
                      <Radio
                        required={data?.phoneType.required}
                        icon={<RadioButtonIcon />}
                        checkedIcon={<SelectedRadioButtonIcon />}
                      />
                    }
                    label="Landline"
                  />
                </RadioGroup>
              </InputWithLabel>
            </div>
          </div>
        </Grid>
      </Grid>
      <div className="contactInfo-save-mp">
        <ExpressButton
          parentClass="contactInfo-button-mp"
          testId="saveme"
          variant="outlined"
          clickHandler={handleCancelContactSave}
        >
          {" "}
          Cancel
        </ExpressButton>
        <ExpressButton
          disabled={
            data?.extension.valid === ValidationStatus.INVALID ||
            data?.phone.valid === ValidationStatus.INVALID ||
            contactInfoChanged
          }
          parentClass="contactInfo-button-mp"
          testId="saveme"
          variant="contained"
          clickHandler={handleContactSave}
        >
          Save
        </ExpressButton>
      </div>
      <Popup
        closeHandler={closePopUpAction}
        dialogParentClass={profileForm?.popUpSection}
        openFlag={openPopUp}
      >
        <div className="pop-up-div">
          {popupSection()}
          <Popup
            openFlag={openChildPopUp}
            closeHandler={() => {
              setOpenChildPopUp(false);
              resetAPIPollingDetails();
            }}
            hideCloseButton={false}
            dialogParentClass="contact-info-pop-up"
          >
            <div>
              {
                <ConfirmLeaveModal
                  leaveBtnAction={handleCancelContactSave}
                  updatePopUp={setOpenChildPopUp}
                />
              }
            </div>
          </Popup>
        </div>
      </Popup>
      <Popup
        closeHandler={closeLoaderPopUpAction}
        dialogParentClass={profileForm?.popUpSection}
        hideCloseButton={true}
        openFlag={openLoaderPopUp}
      >
        <div className="pop-up-div">
          <LoaderModal />
        </div>
      </Popup>
    </div>
  );
};

export default ContactInfoEdit;
