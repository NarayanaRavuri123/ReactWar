import {
  useCallback,
  useEffect,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";
import { Popup } from "../../../core/popup/popup.component";
import { ProfileCancel } from "../cancelProfile/profileCancel.component";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { AuthenticateProfileSave } from "../saveProfile/authenticateProfileSave.component";
import "./buttonGroup.css";
import { ManageProfileValidator } from "../../manageProfile/manageProfile.validator";
import { IManageProfile } from "../../manageProfile/manageProfile.interface";
import { useHistory, useLocation } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import {
  ProfileFormContext,
  ProfileFormContextType,
} from "../../../context/ProfileFormContext";
import { generateAndSendCode } from "../../../util/codeService";
import { getCodeValidateError } from "../../../util/utilityFunctions";
import { verifyCaptcha } from "../../../util/captchaService";
import { EXECUTE_CAPTCHA_ACTION } from "../../../util/staticText";
import { PersistentFooter } from "../../../core/persistentFooter/persistentFooter.Component";
import SnackBar from "../../../core/snackBar/snackBar.component";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import { AuthenticationType } from "../saveProfile/authenticationType.model";

type Props = {
  button1Text: string;
  button2Text: string;
  data: IManageProfile | undefined;
  Validator?: ManageProfileValidator;
  toPath: string;
  setData: any;
  pathType: string;
  setProgbarVal: Dispatch<SetStateAction<number>>;
};

export const FooterButtonGroup = ({
  button1Text,
  button2Text,
  data,
  Validator,
  toPath,
  setData,
  pathType,
  setProgbarVal,
}: Props) => {
  const [openSaveDialog, setOpenSaveDialog] = useState<boolean>(false);
  const [openCancelDialog, setOpenCancelDialog] = useState<boolean>(false);
  const [openAuthVerifyDialog, setOpenAuthVerifyDialog] =
    useState<boolean>(false);
  const [authType, setauthType] = useState("");
  const registrationForm = useContext<ProfileFormContextType | null>(
    ProfileFormContext
  );
  // to be used for validation
  const [validator] = useState(Validator);
  const history = useHistory();
  const [codeAttempt, setCodeAttempt] = useState(true);
  const [codeSentError, setCodeSentError] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [failureMessage, setFailureMessage] = useState<string>("");
  const [snackBarAlert, setSnackBarAlert] = useState<boolean>(false);
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const location = useLocation();
  setTimeout(() => {
    setSnackBarAlert(false);
    setFailureMessage("");
  }, 10000);
  const handleCloseAlert = () => {
    setSnackBarAlert(false);
    setFailureMessage("");
  };
  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }
    if (toPath === "/home") return true;
    const token = await executeRecaptcha(EXECUTE_CAPTCHA_ACTION);
    const notABot = await verifyCaptcha(token);
    return notABot;
  }, [executeRecaptcha]);

  const handleClick = (authenticationType: string) => {
    setCodeSentError("");
    setauthType(authenticationType);
    generateAndSendCodeService(authenticationType);
  };

  const generateAndSendCodeService = async (authType: string) => {
    let reqParams;
    reqParams = {
      mode: authType === "email" ? 0 : 1,
      userName: data?.userName.value,
      email: authType === "email" ? data?.email.value : "",
      phoneNumber:
        authType !== "email"
          ? data?.phone.value.replace(/\s/g, "").replace(/[()-]/g, "")
          : "",
      type:
        pathType === "manageprofile"
          ? AuthenticationType.UPDATE_PROFILE
          : AuthenticationType.REGISTERATION,
      firstName: data?.firstName.value,
    };
    try {
      setIsSendingCode(true);
      const result = await generateAndSendCode(reqParams);
      if (result.succeeded) {
        setIsSendingCode(false);
        setOpenSaveDialog(false);
        setOpenAuthVerifyDialog(true);
        setCodeAttempt(true);
      } else {
        setCodeSentError(getCodeValidateError(result.error.errorCode));
        setIsSendingCode(false);
      }
    } catch (error) {}
  };

  const handleCancelClick = () => {
    if (toPath === "/signUp") {
      history.push(toPath);
    } else {
      setOpenCancelDialog(true);
    }
  };

  const checkAndUpdateUserAndEmailData = async (
    fieldName: string,
    data: IManageProfile | undefined
  ) => {
    let finalData: IManageProfile;
    let fieldVal = "";
    let valResp;
    if (fieldName === "userName") {
      if (data?.userName.value) {
        fieldVal = data.userName.value;
        valResp = await validator?.validateWithDb(fieldVal, fieldName);
        finalData = Object.assign({}, data, {
          userName: {
            value: data.userName.value,
            valid: valResp?.status,
            required: data.userName.required,
            errorMessage: valResp?.message,
          },
        });
        return finalData;
      }
    }
    if (fieldName === "email") {
      if (data?.email.value) {
        fieldVal = data.email.value;
        valResp = await validator?.validateWithDb(fieldVal, fieldName);

        finalData = Object.assign({}, data, {
          email: {
            value: data.email.value,
            valid: valResp?.status,
            required: data.email.required,
            errorMessage: valResp?.message,
          },
        });
        return finalData;
      }
    }
  };

  const handleSaveClick = async () => {
    const notABot = await handleReCaptchaVerify();
    if (notABot) {
      setCodeSentError("");
      let finalData = data;
      if (location.pathname !== "/manageProfile") {
        finalData = await checkAndUpdateUserAndEmailData("userName", data);
        finalData = await checkAndUpdateUserAndEmailData("email", finalData);
      }
      const formStatus = validator?.validateAll(
        finalData,
        setData,
        registrationForm
      );
      if (formStatus === ValidationStatus.VALID) {
        location.pathname !== "/manageProfile" && setProgbarVal(100);
        setOpenSaveDialog(true);
      }
    } else {
      history.push("/botSuspected");
    }
  };

  const handleSnackBar = async () => {
    if (failureMessage) {
      setSnackBarAlert(true);
      setSnackBarMsg(failureMessage);
    } else {
      setSnackBarAlert(false);
    }
  };

  const validateAllFields = useCallback(() => {
    if (validator?.isFormUntouched(data)) return;
    const allValid = validator?.allFieldsValid(data, true);
    const facilityAdded = registrationForm?.registeredFacility.length > 0;
    if (allValid && facilityAdded) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [data, registrationForm?.registeredFacility]);

  useEffect(() => {
    handleSnackBar();
  }, [failureMessage]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  useEffect(() => {
    if (data !== null || data !== undefined) {
      validateAllFields();
    }
  }, [data, registrationForm?.registeredFacility]);

  const spinner = () => {
    return (
      <div className="manage-profile-save">
        <h3 className="header">Authentication</h3>
        <div className="authenticationCodeSent-loader">
          <LoadingSpinner />
        </div>
      </div>
    );
  };

  const authButtons = () => {
    return (
      <div className="manage-profile-save">
        <h3 className="header">Authentication</h3>
        <p className="sub-text">
          Verify you are the account holder using one of the authentication
          methods below
        </p>
        <ExpressButton
          clickHandler={() => handleClick("email")}
          parentClass="sendEmail"
          variant="outlined"
        >
          Send code to email
        </ExpressButton>
        <ExpressButton
          clickHandler={() => handleClick("SMS")}
          parentClass="sendSms"
          variant="outlined"
          disabled={data?.phoneType?.value === "phone"}
        >
          Send code to SMS
        </ExpressButton>
        {codeSentError && (
          <span className="sendCodeError">{codeSentError}</span>
        )}
      </div>
    );
  };

  const enableSaveButton = () => {
    if (submitDisabled === false && registrationForm?.editable === false) {
      return false;
    }
    return true;
  };

  return (
    <>
      <PersistentFooter>
        <ExpressButton
          variant="outlined"
          clickHandler={handleCancelClick}
          parentClass="cancelBtn"
        >
          {button1Text}
        </ExpressButton>
        <ExpressButton
          variant="contained"
          clickHandler={handleSaveClick}
          parentClass="saveBtn"
          disabled={enableSaveButton()}
        >
          {button2Text}
        </ExpressButton>
      </PersistentFooter>
      <Popup
        dialogParentClass="save-registration-dialog"
        closeHandler={() => {
          location.pathname !== "/manageProfile" && setProgbarVal(50);
          setOpenSaveDialog((x) => !x);
        }}
        openFlag={openSaveDialog}
      >
        {isSendingCode ? spinner() : authButtons()}
      </Popup>
      <Popup
        dialogParentClass="auth-verify-dialog"
        closeHandler={() => {
          location.pathname !== "/manageProfile" && setProgbarVal(50);
          setOpenAuthVerifyDialog((x) => !x);
        }}
        openFlag={openAuthVerifyDialog}
      >
        <AuthenticateProfileSave
          data={data}
          AuthType={authType}
          setOpenAuthVerifyDialog={setOpenAuthVerifyDialog}
          setAttempt={setCodeAttempt}
          codeAttempt={codeAttempt}
          failureMessage={setFailureMessage}
          pathType={pathType}
        />
      </Popup>
      <Popup
        dialogParentClass="cancel-dialog"
        closeHandler={() => setOpenCancelDialog((x) => !x)}
        openFlag={openCancelDialog}
      >
        <ProfileCancel
          stayHandler={() => setOpenCancelDialog(false)}
          redirectTo={toPath}
        />
      </Popup>
      <SnackBar
        toastStyle="registerationSaveToast"
        openFlag={snackBarAlert}
        msg={snackBarMsg}
        handleCloseAlert={handleCloseAlert}
      ></SnackBar>
    </>
  );
};
