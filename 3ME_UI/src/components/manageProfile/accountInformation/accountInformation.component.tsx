import React, { useEffect } from "react";
import "./accountInformation.css";
import { Grid, InputBase } from "@mui/material";
import { ManageProfileValidator } from "../manageProfile.validator";
import { IAccountInformationProps } from "./accountInformation.interface";
import {
  Validation,
  ValidationStatus,
} from "../../../core/interfaces/input.interface";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { CustomDropDown } from "../../../core/customDropdown/customDropdown.component";
import { getdropDownContent } from "../../../util/dropDownService";
import {
  DD_DEPARTMENT_CONTENT,
  DD_LICENSE_CONTENT,
} from "../../../util/staticText";
import { format } from "react-string-format";
import { useLocation } from "react-router-dom";

export const AccountInformation = ({
  data,
  Validator,
  setData,
  licenseType,
  department,
}: IAccountInformationProps) => {
  const [validator] = React.useState<ManageProfileValidator>(Validator!);
  const location = useLocation();
  const onBlurValidateAndSetData = async (e: any) => {
    if (location.pathname !== "/manageProfile") {
      const valResp = await validator.validateWithDb(
        e.target.value,
        e.target.name
      );
      setData((prevData: any) => ({
        ...prevData,
        [e.target.name]: {
          value: e.target.value,
          valid: valResp?.status,
          required: e.target.required,
          errorMessage: valResp?.message,
        },
      }));
    }
  };
  const validateAndSetData = (e: any) => {
    const valResp = validator.validate(e.target.value, e.target.name);
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
  };

  const validateAndSetDropDownData = async (e: any) => {
    const isValid = await validator.validate(e.target.value, e.target.name);
    setData(
      Object.assign({}, data, {
        [e.target.name]: {
          value: e.target.value,
          valid: isValid?.status,
          required: true,
        },
      })
    );
  };

  return (
    <div className="accountInfo" data-testid="accountInfo">
      <h2 className="manage-profile-header">Account Information</h2>
      <Grid
        container
        spacing={1}
        classes={{ root: "accountInfo-grid-container" }}
      >
        <Grid
          item
          xs={!data?.userName.required ? 6 : 4}
          className="grid-item-width"
        >
          <InputWithLabel
            label="First name"
            isRequired={data?.firstName.required}
            error={data?.firstName.valid === ValidationStatus.INVALID}
            data-testid="first-name-label"
          >
            <InputBase
              required={data?.firstName.required}
              className="account-info-input"
              name="firstName"
              value={data?.firstName.value}
              onChange={validateAndSetData}
              data-testid="acc-first-name"
              autoFocus
            />
          </InputWithLabel>
        </Grid>
        <Grid
          item
          xs={!data?.userName.required ? 6 : 4}
          className="grid-item-width"
        >
          <InputWithLabel
            label="Last name"
            isRequired={data?.lastName.required}
            error={data?.lastName.valid === ValidationStatus.INVALID}
          >
            <InputBase
              required={data?.lastName.required}
              className="account-info-input"
              name="lastName"
              value={data?.lastName.value}
              onChange={validateAndSetData}
            />
          </InputWithLabel>
        </Grid>
        {data?.userName.required && (
          <Grid item xs={4} className="grid-item-width">
            <InputWithLabel
              label="Username"
              isRequired={data?.userName.required}
              error={data?.userName.valid === ValidationStatus.INVALID}
              errorMessage={data?.userName?.errorMessage}
            >
              <InputBase
                required={data?.userName.required}
                className="account-info-input"
                name="userName"
                value={data?.userName.value}
                onChange={validateAndSetData}
                data-testid="acc-user-name"
                onBlur={onBlurValidateAndSetData}
              />
            </InputWithLabel>
          </Grid>
        )}
        <Grid item xs={4} className="grid-item-width">
          <InputWithLabel
            isRequired={data?.licenseType.required}
            label="License type"
            sx={{ height: "40px" }}
            error={data?.licenseType?.valid === ValidationStatus.INVALID}
          >
            <CustomDropDown
              name="licenseType"
              value={data?.licenseType.value}
              handleChange={validateAndSetDropDownData}
              selectpropsClassName="acount-info-select"
              selectClassName="account-info-input account-info"
              testId="acc-license-type"
              menuItem={licenseType}
            />
          </InputWithLabel>
        </Grid>
        <Grid item xs={4} className="grid-item-width">
          <InputWithLabel
            isRequired={data?.department.required}
            label="Department"
            error={data?.department?.valid === ValidationStatus.INVALID}
          >
            <CustomDropDown
              name="department"
              value={data?.department.value}
              handleChange={validateAndSetDropDownData}
              selectpropsClassName="acount-info-select"
              selectClassName="account-info-input account-info"
              testId="acc-department-type"
              menuItem={department}
            />
          </InputWithLabel>
        </Grid>
        <Grid item xs={4} className="grid-item-width">
          <InputWithLabel
            label="Title"
            isRequired={data?.title.required}
            error={data?.title.valid === ValidationStatus.INVALID}
          >
            <InputBase
              className="account-info-input"
              name="title"
              required={data?.title.required}
              value={data?.title.value}
              onChange={validateAndSetData}
            />
          </InputWithLabel>
        </Grid>
      </Grid>
    </div>
  );
};
