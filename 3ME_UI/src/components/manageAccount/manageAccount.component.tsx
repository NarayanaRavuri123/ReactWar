import { useState, useContext, useEffect, useCallback, ReactNode } from "react";
import { Grid } from "@mui/material";
import ProgressBar from "../progressBar/progressBar.component";
import "./manageAccount.css";
import { defaultAccountData } from "./manageAccount.model";
import { IManageAccount, IManageAccountProps } from "./manageAccount.interface";
import { ManageAccountValidator } from "./manageAccount.validator";
import { ManageAccountUserNamePassword } from "./userNamePassword/userNamePasswordChange.component";
import { getDeepClone } from "../../util/ObjectFunctions";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { ValidationStatus } from "../../core/interfaces/input.interface";
import { getUserProfile } from "../../util/userService";
import { useHistory } from "react-router-dom";
import { VerifyAccount } from "./veriFyAccount/verifyAccount.component";

export const ManageAccount = ({
  DefaultManageAccountData = defaultAccountData,
  Validator = new ManageAccountValidator(),
  setProgbarVal,
}: IManageAccountProps) => {
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const manageAccountData = AuthObj?.manageAccountData;
  const setManageAccountData = AuthObj?.setManageAccountData!;
  const history = useHistory();

  const manageAccUser = async (): Promise<string | undefined> => {
    const user = await getUserProfile();
    if (user !== undefined) {
      AuthObj?.setUserProfile(user);
    }
    return undefined;
  };

  const renderManageAccountWidget = (type: string) => {
    let jsxValue;
    switch (AuthObj?.manageAccountProgbarVal) {
      case 25:
        jsxValue = (
          <ManageAccountUserNamePassword
            data={manageAccountData}
            Validator={Validator}
            setData={setManageAccountData}
          />
        );
        break;
      case 50:
        jsxValue = <VerifyAccount type={type} data={manageAccountData} />;
        break;
      default:
        jsxValue = (
          <ManageAccountUserNamePassword
            data={manageAccountData}
            Validator={Validator}
            setData={setManageAccountData}
          />
        );
        break;
    }
    return jsxValue;
  };

  const callRenderWidget = useCallback(() => {
    return renderManageAccountWidget(AuthObj?.verificationType!);
  }, [AuthObj?.manageAccountProgbarVal, AuthObj?.manageAccountData]);

  const handleCancelBtn = () => {
    setManageAccountData(
      Object.assign({}, manageAccountData, {
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

  const handleBackProgress = () => {
    let page: any;
    switch (AuthObj?.manageAccountProgbarVal!) {
      case 25:
        page = handleCancelBtn();
        break;
      case 50:
        AuthObj?.setManageAccountProgbarVal(25);
        break;
    }

    return page;
  };

  useEffect(() => {
    manageAccUser();
  }, []);

  return (
    <>
      <Grid item>
        <ProgressBar
          pageTitle="Account administration"
          progressValue={AuthObj?.manageAccountProgbarVal!}
          backButtonAction={handleBackProgress}
        />
      </Grid>
      <Grid className="manage-acc-flow" container>
        <Grid
          item
          className="manage-acc-container"
          justifyContent="center"
          alignItems="center"
        >
          {callRenderWidget()}
        </Grid>
      </Grid>
    </>
  );
};
