import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Grid, IconButton, InputBase } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { IManageAccount } from "../manageAccount.interface";
import { ManageAccountHeader } from "../manageAccountHeader";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import "./userNamePassword.css";
import { useHistory } from "react-router-dom";
import { generateAndSendCode } from "../../../util/codeService";
import { AuthenticationType } from "../../authenticateProfile/saveProfile/authenticationType.model";

export interface IManageAccountUserNamePassword {
  Validator?: any;
  data: IManageAccount | undefined;
  setData: any;
}
export const ManageAccountUserNamePassword = ({
  Validator,
  data,
  setData,
}: IManageAccountUserNamePassword) => {
  const [openUserName, setOpenUserName] = useState(true);

  const [verifyEmailDisabled, setVerifyEmailDisabled] = useState(true);
  const [verifySMSDisabled, setVerifySMSDisabled] = useState(true);
  const [code, setCode] = useState();
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (
      data?.manageAccountUserName.value === undefined ||
      data?.manageAccountUserName.value === ""
    ) {
      setData(
        Object.assign({}, data, {
          manageAccountUserName: {
            value: AuthObj?.userProfile?.userName!,
            valid: ValidationStatus.VALID,
            required: true,
          },
        })
      );
    } else {
      if (
        data?.manageAccountUserName.value !== AuthObj?.userProfile?.userName!
      ) {
        setVerifyEmailDisabled(false);
        if (
          AuthObj?.userProfile?.mobilePhoneNo !== "" &&
          AuthObj?.userProfile?.mobilePhoneNo !== null
        ) {
          setVerifySMSDisabled(false);
        }
      }
    }
  }, [AuthObj?.userProfile]);

  const validateAndSetData = (e: any) => {
    const valResp = Validator.validate(e.target.value, e.target.name);
    setData(
      Object.assign({}, data, {
        [e.target.name]: {
          value: e.target.value,
          valid: valResp?.status,
          required: e.target.required,
          errorMessage: valResp?.message,
        },
      })
    );
    if (
      e.target.value !== AuthObj?.userProfile?.userName &&
      valResp?.status === ValidationStatus.VALID &&
      AuthObj?.userProfile?.mobilePhoneNo !== "" &&
      AuthObj?.userProfile?.mobilePhoneNo !== null
    ) {
      setVerifySMSDisabled(false);
    } else {
      setVerifySMSDisabled(true);
    }
    if (
      e.target.value !== AuthObj?.userProfile?.userName &&
      valResp?.status === ValidationStatus.VALID
    ) {
      setVerifyEmailDisabled(false);
    } else {
      setVerifyEmailDisabled(true);
    }
  };
  const handleUserNameClear = () => {
    setData(
      Object.assign({}, data, {
        manageAccountUserName: {
          value: AuthObj?.userProfile?.userName!,
          valid: ValidationStatus.VALID,
          required: true,
        },
      })
    );
    setOpenUserName(false);
    setVerifyEmailDisabled(true);
    setVerifySMSDisabled(true);
  };

  const handleCancelBtn = () => {
    setData(
      Object.assign({}, data, {
        manageAccountUserName: {
          value: AuthObj?.userProfile?.userName!,
          valid: ValidationStatus.VALID,
          required: true,
        },
        manageAccountNewPassword: {
          value: "",
          valid: ValidationStatus.VALID,
          required: true,
        },
        manageAccountConfirmPassword: {
          value: "",
          valid: ValidationStatus.VALID,
          required: true,
        },
      })
    );
    history.goBack();
  };

  const handleSubmit = async (type: string, e: any) => {
    if (data?.manageAccountUserName.value !== AuthObj?.userProfile?.userName) {
      const valResp = await Validator.validateWithDb(
        data?.manageAccountUserName.value,
        "manageAccountUserName"
      );
      setData(
        Object.assign({}, data, {
          manageAccountUserName: {
            value: data?.manageAccountUserName.value,
            valid: valResp?.status,
            required: data?.manageAccountUserName.required,
            errorMessage: valResp?.message,
          },
        })
      );
      if (valResp?.status === ValidationStatus.VALID) {
        const isValid = Validator.validateAll(data, setData);
        if (isValid?.status === ValidationStatus.VALID) {
          try {
            const reqParams = {
              mode: type === "email" ? 0 : 1,
              userName: AuthObj?.userProfile?.userName,
              email: type === "email" ? AuthObj?.userProfile?.emailAddress : "",
              phoneNumber:
                type !== "email"
                  ? AuthObj?.userProfile?.mobilePhoneNo
                      .replace(/\s/g, "")
                      .replace(/[()-]/g, "")
                  : "",
              type: AuthenticationType.UPDATE_USERNAME,
            };
            const resp = await generateAndSendCode(reqParams);
            if (resp.succeeded) {
              AuthObj?.setVerificationType(type);
              AuthObj?.setManageAccountProgbarVal(50);
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  };

  const onBlurValidateAndSetData = async (e: any) => {
    if (data?.manageAccountUserName.value !== AuthObj?.userProfile?.userName) {
      const valResp = await Validator.validateWithDb(
        data?.manageAccountUserName.value,
        "manageAccountUserName"
      );
      setData(
        Object.assign({}, data, {
          [e.target.name]: {
            value: e.target.value,
            valid: valResp?.status,
            required: e.target.required,
            errorMessage: valResp?.message,
          },
        })
      );
    }
  };

  return (
    <Grid
      container
      className="manage-acc-detail-card"
      data-testid="manage-acc-detail-card"
    >
      <Grid item>
        <div className="manage-detail-card">
          <ManageAccountHeader />

          <div className="userNameMain">
            <p
              className="titleStyle"
              data-testid="manage-acc-username-title-test"
              onClick={(event) => setOpenUserName(!openUserName)}
            >
              Change Username
              <IconButton
                className="titleIcon"
                aria-haspopup="true"
                sx={{ height: "9px" }}
              >
                {openUserName ? (
                  <KeyboardArrowUp width="16" height="8" />
                ) : (
                  <KeyboardArrowDown width="16" height="8" />
                )}
              </IconButton>
            </p>
            {openUserName && (
              <div className="userNameDiv">
                <Grid container>
                  <Grid item className="grid-item-width">
                    <InputWithLabel
                      label="Username"
                      isRequired={data?.manageAccountUserName.required}
                      error={
                        data?.manageAccountUserName.valid ===
                        ValidationStatus.INVALID
                      }
                      errorMessage={data?.manageAccountUserName?.errorMessage}
                    >
                      <InputBase
                        required={data?.manageAccountUserName.required}
                        className="manage-acc-input"
                        name="manageAccountUserName"
                        value={data?.manageAccountUserName.value}
                        onChange={validateAndSetData}
                        data-testid="acc-user-name"
                      />
                    </InputWithLabel>
                  </Grid>
                </Grid>
                <p className="clearStyle" onClick={handleUserNameClear}>
                  Clear
                </p>
              </div>
            )}
          </div>

          <div className="manageAccBtn">
            <div className="manageAccCancelDiv">
              <ExpressButton
                clickHandler={handleCancelBtn}
                parentClass="manage-acc-cancel"
                testId="acc-cancel-test"
                variant="text"
              >
                Cancel
              </ExpressButton>
            </div>

            <div>
              <ExpressButton
                clickHandler={(e) => handleSubmit("SMS", e)}
                variant="outlined"
                testId="acc-verifypassword-test"
                parentClass="manage-acc-verifysms"
                disabled={verifySMSDisabled}
              >
                Verify with SMS
              </ExpressButton>
              <ExpressButton
                variant="contained"
                clickHandler={(e) => handleSubmit("email", e)}
                testId="acc-verifyemail-test"
                parentClass="manage-acc-verifyemail"
                disabled={verifyEmailDisabled}
              >
                Verify with Email
              </ExpressButton>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
