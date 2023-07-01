import React, { useContext, useEffect } from "react";
import "./attestationAndSignature.css";
import moment from "moment";
import InputMask from "react-input-mask";
import { Grid, InputBase, TextField } from "@mui/material";
import { ValidationStatus } from "../interfaces/input.interface";
import { InputWithLabel } from "../inputWithLabel/inputWithLabel.component";
import { IAttestationAndSign } from "./attestationAndSign.interface";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { AddWoundAssessmentValidator } from "../../components/myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/addWoundAssessment.validator";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../context/RolesPermissionContext";
import { makeCapitalEachWordInString } from "../../util/utilityFunctions";
import { woundAssessmentAttest } from "../../components/myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundReviewAssessment/attestationAndSignature.model";
import AttestationAndSignatureSummary from "./attestationAndSignatureSummary/attestationAndSignatureSummary.component";
import { MobileDisplayContext } from "../../context/MobileDisplayContext";

type Props = {
  attestationData: IAttestationAndSign;
  setAttestationData: React.Dispatch<React.SetStateAction<IAttestationAndSign>>;
  Validator?: AddWoundAssessmentValidator;
  isReviewAssessment?: boolean;
};

const AttestationAndSignature = ({
  attestationData,
  setAttestationData,
  Validator = new AddWoundAssessmentValidator(),
  isReviewAssessment,
}: Props) => {
  const [validator] = React.useState<AddWoundAssessmentValidator>(Validator);
  let currentDate = moment(Date()).format("MM/DD/YYYY");
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  const [focusClasses, setFocusClasses] = React.useState({
    confirmationData: "",
    phoneNumber: "",
  });
  const { isMobileScreen } = useContext(MobileDisplayContext);
  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const validateAndSetData = (e: any) => {
    if (
      e.target.name === "phoneNumber" &&
      attestationData.phoneNumber.valid === ValidationStatus.UNTOUCHED &&
      (e.target.value === "(___) ___-____" || e.target.value === "")
    ) {
      return;
    }
    const isValid = validator.validate(e.target.value, e.target.name);
    setAttestationData({
      ...attestationData,
      [e.target.name]: {
        value: e.target.value,
        valid: isValid?.status,
        required: true,
      },
    });
  };

  useEffect(() => {
    let tempData = attestationData;
    if (
      permissionObj &&
      (permissionObj.mappedRolesPermissionData.IsSalesRole ||
        permissionObj.mappedRolesPermissionData.IsSalesManagerRole)
    ) {
      tempData.firstNameLastName = {
        valid: attestationData.firstNameLastName.valid,
        value: attestationData.firstNameLastName.value,
        required: true,
      };
      tempData.employer = {
        value: makeCapitalEachWordInString(
          AuthObj?.registeredFaciltyAddress?.accountName ?? ""
        ),
        valid: ValidationStatus.VALID,
        required: true,
      };
      tempData.phoneNumber = {
        valid: attestationData.phoneNumber.valid,
        value: attestationData.phoneNumber.value,
        required: true,
      };
      tempData.confirmationData = {
        value: currentDate,
        valid: ValidationStatus.VALID,
        required: true,
      };
    }
    setAttestationData(tempData);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {!isReviewAssessment ? (
        <div className="attest-container" data-testid="attest-container">
          <div className="attest-title" data-testid="attest-title">
            Attestation & Signature
          </div>
          <div className="attest-box">
            {permissionObj?.mappedRolesPermissionData.IsSalesRole ||
            permissionObj?.mappedRolesPermissionData.IsSalesManagerRole ? (
              <>
                <div
                  className="attest-sale-desp"
                  data-testid="attest-sale-desp-sale"
                >
                  As a 3M representative, you have confirmed the wound
                  assessment with the following individual:
                </div>
                <Grid
                  container
                  spacing={2}
                  classes={{ root: "attest-container-component" }}
                >
                  <Grid item xs={6}>
                    <InputWithLabel
                      label="First & Last Name"
                      testId="firstLastNameID"
                      isRequired={true}
                      error={
                        attestationData.firstNameLastName.valid ===
                        ValidationStatus.INVALID
                      }
                    >
                      <InputBase
                        className="attest-line1-input"
                        autoFocus={true}
                        name="firstNameLastName"
                        value={attestationData.firstNameLastName.value}
                        onChange={validateAndSetData}
                        data-testid="firstNameLastNameTest"
                      />
                    </InputWithLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <InputWithLabel
                      label="Employer"
                      testId="employerid"
                      isRequired={true}
                      error={
                        attestationData.employer.valid ===
                        ValidationStatus.INVALID
                      }
                    >
                      <InputBase
                        className="attest-line1-input"
                        disabled={true}
                        name="employer"
                        value={makeCapitalEachWordInString(
                          AuthObj?.registeredFaciltyAddress?.accountName!
                        )}
                        onChange={() => {}}
                        data-testid="employerTest"
                      />
                    </InputWithLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <InputWithLabel
                      labelClassName={focusClasses.phoneNumber}
                      label="Phone Number"
                      testId="phonenumberid"
                      isRequired={true}
                      error={
                        attestationData?.phoneNumber.valid ===
                        ValidationStatus.INVALID
                      }
                    >
                      <InputMask
                        className="phone"
                        mask="(999) 999-9999"
                        name="phoneNumber"
                        onBlur={(e) => setClasses(e, "")}
                        onChange={validateAndSetData}
                        onFocus={(e) => setClasses(e, "Mui-focused")}
                        placeholder="(___) ___-____"
                        value={attestationData.phoneNumber.value}
                      />
                    </InputWithLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <InputWithLabel
                      labelClassName={focusClasses.confirmationData}
                      label="Confirmation Date"
                      isRequired={true}
                      error={
                        attestationData?.confirmationData.valid ===
                        ValidationStatus.INVALID
                      }
                      testId="confirmationdateid"
                    >
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          components={{ OpenPickerIcon: CalendarIcon }}
                          InputAdornmentProps={{
                            classes: {
                              root: "adornedRoot",
                            },
                          }}
                          InputProps={{
                            classes: {
                              root: `confirmationData ${
                                attestationData?.confirmationData.valid ===
                                ValidationStatus.INVALID
                                  ? "showError"
                                  : "noError"
                              }`,
                              input: "input",
                              notchedOutline: "outline",
                            },
                          }}
                          onChange={() => {}}
                          disabled={true}
                          renderInput={(params) => {
                            params.error = false;
                            params.inputProps!.placeholder = "__/__/____";
                            return (
                              <TextField
                                name="confirmationData"
                                onFocus={(e) => setClasses(e, "Mui-focused")}
                                onBlur={(e) => setClasses(e, "")}
                                {...params}
                              />
                            );
                          }}
                          value={new Date()}
                        />
                      </LocalizationProvider>
                    </InputWithLabel>
                  </Grid>
                </Grid>
                <div className="rep-desp">
                  Type your full name as signature to certify that the
                  information included in this wound assessment is an accurate
                  reflection of the patient’s medical record.
                </div>
                <Grid
                  container
                  spacing={2}
                  classes={{ root: "attest-container-component" }}
                >
                  <Grid item xs={8}>
                    <InputWithLabel
                      label="3M Representative Name"
                      isRequired={true}
                      error={
                        attestationData?._3MRepresentativeName?.valid ===
                        ValidationStatus.INVALID
                      }
                    >
                      <InputBase
                        className="attest-line1-input"
                        name="_3MRepresentativeName"
                        value={attestationData?._3MRepresentativeName?.value}
                        onChange={validateAndSetData}
                        placeholder="Full Name"
                      />
                    </InputWithLabel>
                    {AuthObj && (
                      <div className="accountName">{AuthObj!.userName}</div>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    <div
                      className="attestationDate"
                      data-testid="attestationDate"
                    >
                      Attestation Date
                    </div>
                    <div className="attestationCurrentDate">{currentDate}</div>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <div
                  className="attest-sale-desp"
                  data-testid="attest-sale-desp-nonsale"
                >
                  Type your full name as signature to certify that the
                  information included in this wound assessment is an accurate
                  reflection of the patient’s medical record.
                </div>
                <Grid
                  container
                  classes={{ root: "attest-container-component" }}
                >
                  <Grid item xs={8}>
                    <InputWithLabel
                      label="Your Name"
                      testId="attest-your-Name"
                      isRequired={true}
                      error={
                        attestationData?._3MRepresentativeName?.valid ===
                        ValidationStatus.INVALID
                      }
                    >
                      <InputBase
                        className="attest-line1-input"
                        name="_3MRepresentativeName"
                        autoFocus={true}
                        value={attestationData?._3MRepresentativeName?.value}
                        onChange={validateAndSetData}
                        placeholder="Full Name"
                      />
                    </InputWithLabel>
                    {AuthObj && (
                      <div className="accountName">{AuthObj!.userName}</div>
                    )}
                  </Grid>
                  <Grid item xs={isMobileScreen ? 8 : 4}>
                    <div
                      className="attestationDate"
                      data-testid="attestationDate"
                    >
                      Attestation Date
                    </div>
                    <div className="attestationCurrentDate">{currentDate}</div>
                  </Grid>
                </Grid>
              </>
            )}
          </div>
        </div>
      ) : (
        <AttestationAndSignatureSummary attestationData={attestationData} />
      )}
    </div>
  );
};

export default AttestationAndSignature;
