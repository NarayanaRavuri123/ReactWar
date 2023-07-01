import Moment from "moment";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import { useState, useContext, useEffect } from "react";
import InputMask from "react-input-mask";
import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { IDischargeRequest } from "../dischargeRequest.interface";
import { DischargeRequestValidator } from "../dischargeRequest.validator";
import "./submitterInformation.css";
import { SubmitterInformationReview } from "./submitterInformationReview/submitterInformation.review.component";
import {
  DischargeRequestContext,
  DischargeRequestContextType,
} from "../../../../context/DischargeRequestContext";
import { MobileDisplayContext } from "../../../../context/MobileDisplayContext";

interface Props {
  dischargeData: IDischargeRequest;
  setDischargeData: Function;
  isReviewDischargePage?: boolean;
  dischargeRequestEditBtnClick?: () => void;
  isSummaryDischargePage?: boolean;
}

const SubmitterInformation = ({
  dischargeData,
  setDischargeData,
  isReviewDischargePage = false,
  dischargeRequestEditBtnClick,
  isSummaryDischargePage = false,
}: Props) => {
  const { isMobileScreen } = useContext(MobileDisplayContext);
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const DischargeReqObj = useContext<DischargeRequestContextType | null>(
    DischargeRequestContext
  );
  const [focusClasses, setFocusClasses] = useState({
    submitterPhoneNumber: "",
  });

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const validateAndSetData = (e: any) => {
    const validator = new DischargeRequestValidator();
    let { value, name } = e.target;
    let isvalid = validator.validate(value, name);
    setDischargeData((dischargeData: IDischargeRequest) => ({
      ...dischargeData,
      [e.target.name]: {
        value: value,
        valid: isvalid?.status,
        required: true,
      },
    }));
  };

  const validateAutoPopulateData = (value: string) => {
    return value! ? ValidationStatus.VALID : ValidationStatus.UNTOUCHED;
  };

  useEffect(() => {
    if (!DischargeReqObj?.isPreviousClicked) {
      let tempDischargeData: IDischargeRequest;
      tempDischargeData = {
        ...dischargeData,
        submitterFirstName: {
          value: AuthObj?.userProfile?.firstName!,
          valid: validateAutoPopulateData(AuthObj?.userProfile?.firstName!),
          required: true,
        },
        submitterLastName: {
          value: AuthObj?.userProfile?.lastName!,
          valid: validateAutoPopulateData(AuthObj?.userProfile?.lastName!),
          required: true,
        },
        submitterTitle: {
          value: AuthObj?.userProfile?.title!,
          valid: validateAutoPopulateData(AuthObj?.userProfile?.title!),
          required: true,
        },
        submitterPhoneNumber: {
          value:
            dischargeData.submitterPhoneNumber.value === ""
              ? AuthObj?.userProfile?.mobilePhoneNo === null
                ? AuthObj?.userProfile?.phoneNo!
                : AuthObj?.userProfile?.mobilePhoneNo!
              : dischargeData.submitterPhoneNumber.value,
          valid: validateAutoPopulateData(
            dischargeData.submitterPhoneNumber.value === ""
              ? AuthObj?.userProfile?.mobilePhoneNo === null
                ? AuthObj?.userProfile?.phoneNo!
                : AuthObj?.userProfile?.mobilePhoneNo!
              : dischargeData.submitterPhoneNumber.value
          ),
          required: true,
        },
        submitterEmployer: {
          value:
            dischargeData.submitterEmployer.value === ""
              ? AuthObj?.registeredFaciltyAddress?.accountName!
              : dischargeData.submitterEmployer.value,
          valid: validateAutoPopulateData(
            AuthObj?.registeredFaciltyAddress?.accountName!
          ),
          required: true,
        },
      };
      setDischargeData(tempDischargeData);
    }
  }, []);

  return !isReviewDischargePage ? (
    <div data-testid="submitter-info" className="submitter-info">
      <div data-testid="submitterinfo-header" className="submitterinfo-header">
        Submitter Information
      </div>
      <div data-testid="submitterinfo-desp" className="submitterinfo-desp">
        Your invoice will reflect billing through{" "}
        {Moment(new Date()).format("L")}.
      </div>
      <Grid container spacing={2} width="100%">
        <Grid item xs={isMobileScreen ? 12 : 6}>
          <InputWithLabel
            testId="submitterinfo-First-Name"
            label="First Name"
            isRequired={true}
            error={
              dischargeData.submitterFirstName.valid ===
              ValidationStatus.INVALID
            }
          >
            <InputBase
              className="input-base-div"
              autoFocus
              name="submitterFirstName"
              onChange={validateAndSetData}
              value={dischargeData.submitterFirstName.value}
            />
          </InputWithLabel>
        </Grid>
        <Grid item xs={isMobileScreen ? 12 : 6}>
          <InputWithLabel
            testId="submitterinfo-Last-Name"
            label="Last Name"
            isRequired={true}
            error={
              dischargeData.submitterLastName.valid === ValidationStatus.INVALID
            }
          >
            <InputBase
              className="input-base-div"
              name="submitterLastName"
              onChange={validateAndSetData}
              value={dischargeData.submitterLastName.value}
            />
          </InputWithLabel>
        </Grid>
      </Grid>
      <div className="grid-discharge-req">
        <Grid container spacing={2} width="100%">
          <Grid item xs={isMobileScreen ? 12 : 6}>
            <InputWithLabel
              testId="submitterinfo-Submitter-Title"
              label="Title"
              isRequired={true}
              error={
                dischargeData.submitterTitle.valid === ValidationStatus.INVALID
              }
            >
              <InputBase
                className="input-base-div"
                name="submitterTitle"
                onChange={validateAndSetData}
                value={dischargeData.submitterTitle.value}
              />
            </InputWithLabel>
          </Grid>
          <Grid item xs={isMobileScreen ? 12 : 6}>
            <InputWithLabel
              label="Phone Number"
              isRequired={true}
              error={
                dischargeData.submitterPhoneNumber.valid ===
                ValidationStatus.INVALID
              }
              labelClassName={focusClasses.submitterPhoneNumber}
              testId="phone-number-label"
            >
              <InputMask
                className="submitterinfo-contactNumber"
                data-testid="phone-number-value"
                mask="(999) 999-9999"
                name="submitterPhoneNumber"
                onBlur={(e) => setClasses(e, "")}
                onChange={validateAndSetData}
                onFocus={(e) => setClasses(e, "Mui-focused")}
                placeholder="(___) ___-____"
                value={dischargeData.submitterPhoneNumber.value}
              />
            </InputWithLabel>
          </Grid>
        </Grid>
      </div>
      <div className="grid-discharge-req">
        <Grid container spacing={2} width="100%">
          <Grid item xs={isMobileScreen ? 12 : 6}>
            <InputWithLabel
              testId="submitterinfo-Submitter-Employer"
              label="Employer"
              isRequired={true}
              error={
                dischargeData.submitterEmployer.valid ===
                ValidationStatus.INVALID
              }
            >
              <InputBase
                className="input-base-div"
                name="submitterEmployer"
                onChange={validateAndSetData}
                value={dischargeData.submitterEmployer.value}
              />
            </InputWithLabel>
          </Grid>
        </Grid>
      </div>
    </div>
  ) : (
    <SubmitterInformationReview
      discharge={dischargeData}
      dischargeRequestEditBtnClick={dischargeRequestEditBtnClick}
      isSummaryDischargePage={isSummaryDischargePage}
    />
  );
};

export default SubmitterInformation;
