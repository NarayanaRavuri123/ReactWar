import {
  ForgotCredentialPages,
  ForgotPasswordChannel,
  ForgotPasswordOption,
} from "./forgotCredentialPages.enum";
import {
  ForgotPasswordInfo,
  IForgotCredentialContainer,
} from "./forgotCredential.interface";
import {
  authenticationChannel,
  changePassword,
  checkStatusForForgotPasswordFlow,
  getUserContactInfo,
  validateCode,
} from "../../../util/forgotPasswordFlow";
import { ReactNode, useState } from "react";
import ForgotPassword from "../forgotPassword.component";
import { Popup } from "../../../core/popup/popup.component";
import { getDeepClone } from "../../../util/ObjectFunctions";
import { generateAndSendCode } from "../../../util/codeService";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import usePollingInterval from "../../../core/customHooks/useInterval";
import { defaultForgotPassordInfoData } from "./forgotCredential.model";
import CodeVerification from "../../codeVerification/codeVerification.component";
import "../forgotPassword.css";

export const ForgotCredentialParent = ({
  defaultPageSection,
}: IForgotCredentialContainer) => {
  const [currentFCPage, setCurrentFCPage] = useState<ForgotCredentialPages>(
    ForgotCredentialPages.ENTER_USERNAME
  );
  const [timeInterval, setTimeInterval] = useState<number | null>(null);
  const [pollingUrl, setPollingUrl] = useState<any | undefined>();
  const [instanceId, setInstanceId] = useState<string | undefined>();
  const [currentLastUpdatedTime, setCurrentLastUpdatedTime] = useState<
    string | null
  >(null);
  const [currentStatusCode, setCurrentStatusCode] = useState<number | null>(
    null
  );
  const [data, setData] = useState<ForgotPasswordInfo>(
    getDeepClone(defaultForgotPassordInfoData)
  );
  const [preferedOption, setPreferedOption] = useState<ForgotPasswordOption>(
    ForgotPasswordOption.NONE
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openLoaderPopUp, setOpenLoaderPopUp] = useState<boolean>(false);

  usePollingInterval(() => {
    checkStatus();
  }, timeInterval);

  const changePasswordAPI = async (userName: string) => {
    setOpenLoaderPopUp(true);
    const params = {
      username: userName,
      Mode: 1,
    };
    const reqBody = JSON.stringify(params);
    const response = await changePassword(reqBody);
    if (response) {
      setInstanceId(response.id);
      setPollingUrl(response.statusQueryGetUri);
      setTimeInterval(1000);
      checkStatus();
    } else {
      setOpenLoaderPopUp(false);
      resetAPIPollingDetails();
      setErrorMessage("Oops something went wrong !");
    }
  };

  const checkUserPreference = async () => {
    if (instanceId) {
      const params = {
        channel: data.choosedOption,
      };
      const reqBody = JSON.stringify(params);
      const response = await authenticationChannel(instanceId, reqBody);
      if (response) {
        setTimeInterval(1000);
      } else {
        setOpenLoaderPopUp(false);
        resetAPIPollingDetails();
        setErrorMessage("Oops something went wrong !");
      }
    } else {
      setOpenLoaderPopUp(false);
    }
  };

  const getUserContactInfoDetails = async () => {
    const params = {
      userName: data.userName,
    };
    const reqBody = JSON.stringify(params);
    const response = await getUserContactInfo(reqBody);
    if (response && response.succeeded) {
      const contactInfo = response.data;
      // Success
      setData({
        ...data,
        emailId: contactInfo.emailID ?? "",
        mobileNumber: contactInfo.mobileNumber ?? "",
      });
      return contactInfo;
    } else {
      setOpenLoaderPopUp(false);
      setErrorMessage("Oops something went wrong !");
      return false;
    }
  };

  const validateCodeAPI = async (code: string) => {
    setOpenLoaderPopUp(true);
    const params = {
      Mode: 1,
      Code: code,
    };
    const reqBody = JSON.stringify(params);
    const response = await validateCode(instanceId!, reqBody);
    if (response) {
      setTimeInterval(1000);
    } else {
      setErrorMessage("Oops something went wrong !");
    }
  };

  const resendVerificationCode = async () => {
    setOpenLoaderPopUp(true);
    try {
      let contactInfo: any = null;
      if (data.emailId === "" && data.mobileNumber === "") {
        contactInfo = await getUserContactInfoDetails();
      }
      if (contactInfo || (data.emailId !== "" && data.mobileNumber !== "")) {
        const reqParams = {
          mode: data.channel,
          userName: data.userName,
          email:
            data.channel === ForgotPasswordChannel.EMAIL
              ? data.emailId === ""
                ? contactInfo.emailID
                : data.emailId
              : "",
          phoneNumber:
            data.channel === ForgotPasswordChannel.SMS
              ? data.mobileNumber === ""
                ? contactInfo.mobileNumber
                : data.emailId
              : "",
          type: 1,
        };
        const response = await generateAndSendCode(reqParams);
        setOpenLoaderPopUp(false);
        if (response && response.succeeded) {
          setData({
            ...data,
            isResendSuccess: true,
          });
        } else {
          setErrorMessage("Oops something went wrong !");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkStatus = async () => {
    if (pollingUrl) {
      let response = await checkStatusForForgotPasswordFlow(pollingUrl);
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
    message: any,
    lastUpdatedTime: string
  ) => {
    if (
      !currentLastUpdatedTime ||
      (currentStatusCode &&
        currentStatusCode !== status &&
        currentLastUpdatedTime &&
        currentLastUpdatedTime !== lastUpdatedTime)
    ) {
      setCurrentStatusCode(status);
      setCurrentLastUpdatedTime(lastUpdatedTime);
      switch (status) {
        case 104:
        case 107:
          // Unable to send verification code
          resetAPIPollingDetails();
          setOpenLoaderPopUp(false);
          setTimeInterval(null);
          setErrorMessage(message);
          break;

        case 105:
          // VerificationCodeHasSentViaEmail
          setOpenLoaderPopUp(false);
          setTimeInterval(null);
          if (errorMessage) {
            setErrorMessage("");
          }
          setCurrentFCPage(ForgotCredentialPages.CODE_VERIFICATION);
          break;

        case 106:
          // VerificationCodeHasSentViaSMS
          setOpenLoaderPopUp(false);
          setTimeInterval(null);
          if (errorMessage) {
            setErrorMessage("");
          }
          setCurrentFCPage(ForgotCredentialPages.CODE_VERIFICATION);
          break;

        case 113:
          setTimeInterval(null);
          switch (data.choosedOption) {
            case ForgotPasswordOption.EMAIL:
              const email: string | null = message.data.EmailID;
              if (email) {
                setData({
                  ...data,
                  maskedEmailId: email,
                  channel: 0,
                });
                checkUserPreference();
              } else {
                resetAPIPollingDetails();
                setErrorMessage(
                  "A Email ID is needed to reset with Email. Please instead reset with SMS."
                );
                setPreferedOption(ForgotPasswordOption.SMS);
                setOpenLoaderPopUp(false);
              }
              break;
            case ForgotPasswordOption.SMS:
              const mobileNumber: string | null = message.data.MobileNumber;
              if (mobileNumber) {
                setData({
                  ...data,
                  maksedMobileNumber: mobileNumber!,
                  channel: 1,
                });
                checkUserPreference();
              } else {
                resetAPIPollingDetails();
                setErrorMessage(
                  "A mobile number is needed to reset with SMS. Please instead reset with email."
                );
                setPreferedOption(ForgotPasswordOption.EMAIL);
                setOpenLoaderPopUp(false);
              }
              break;
          }
          break;

        case 116:
          // Success
          setOpenLoaderPopUp(false);
          window.location.href = message;
          break;

        case 117:
          // Username does not exist
          resetAPIPollingDetails();
          setOpenLoaderPopUp(false);
          setTimeInterval(null);
          setErrorMessage("Oops something went wrong !");
          break;

        case 1005:
        case 1006:
          // VerificationCodeNotValid
          setOpenLoaderPopUp(false);
          setTimeInterval(null);
          setErrorMessage("Please enter valid code and try again.");
          setCurrentStatusCode(status);
          break;
        default:
          break;
      }
    }
  };

  const resetAPIPollingDetails = () => {
    const tempData = getDeepClone(defaultForgotPassordInfoData);
    setData(tempData);
    setCurrentStatusCode(null);
    setCurrentLastUpdatedTime(null);
    setTimeInterval(null);
    setPollingUrl(undefined);
    setInstanceId(undefined);
    setErrorMessage("");
  };

  const resetPasswordAction = async (
    type: ForgotPasswordOption,
    userName: string
  ) => {
    resetAPIPollingDetails();
    setData({
      ...data,
      userName: userName,
      choosedOption: type,
    });
    await changePasswordAPI(userName);
  };

  const resendCodeAction = async () => {
    resendVerificationCode();
  };

  const verifyCodeAction = async (code: string) => {
    await validateCodeAPI(code);
  };

  const forgotCredentialPageToDisplay = () => {
    let page: ReactNode;
    switch (currentFCPage) {
      case ForgotCredentialPages.ENTER_USERNAME:
        page = (
          <ForgotPassword
            errorMessage={errorMessage}
            preferedOption={preferedOption}
            resetPasswordAction={resetPasswordAction}
            setErrorMessage={setErrorMessage}
            setPreferedOption={setPreferedOption}
          />
        );
        break;
      case ForgotCredentialPages.CODE_VERIFICATION:
        page = (
          <CodeVerification
            data={data}
            setData={setData}
            errorMessage={errorMessage}
            backButtonAction={() => {
              resetAPIPollingDetails();
              setPreferedOption(ForgotPasswordOption.NONE);
              setCurrentFCPage(ForgotCredentialPages.ENTER_USERNAME);
            }}
            resendCodeAction={resendCodeAction}
            verifyCodeAction={verifyCodeAction}
          />
        );
        break;
    }
    return page;
  };

  return (
    <>
      {forgotCredentialPageToDisplay()}
      <Popup
        openFlag={openLoaderPopUp}
        closeHandler={() => setOpenLoaderPopUp(false)}
        dialogParentClass={"forgot-password-loader-pop-up"}
        data-testid="loader-pop-up"
        hideCloseButton={true}
      >
        <div className="forgot-password-loader">
          <LoadingSpinner />
        </div>
      </Popup>
    </>
  );
};
