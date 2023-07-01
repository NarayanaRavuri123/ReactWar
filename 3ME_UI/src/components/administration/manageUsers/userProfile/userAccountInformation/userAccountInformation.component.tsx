import { useState } from "react";
import "./userAccountInformation.css";
import { Grid, InputBase } from "@mui/material";
import { UserProfileValidator } from "../userProfile.validator";
import { IUserAccountInformationProps } from "../userProfile.interface";
import { ValidationStatus } from "../../../../../core/interfaces/input.interface";
import { CustomDropDown } from "../../../../../core/customDropdown/customDropdown.component";
import { InputWithLabel } from "../../../../../core/inputWithLabel/inputWithLabel.component";

export const UserAccountInformation = ({
  data,
  department,
  licenseType,
  setData,
}: IUserAccountInformationProps) => {
  const [validator] = useState<UserProfileValidator>(
    new UserProfileValidator()
  );
  const validateAndSetData = (e: any) => {
    const result = validator.validate(e.target.value, e.target.name);
    setData({
      ...data,
      [e.target.name]: {
        value: e.target.value,
        valid: result?.status,
        required: e.target.required,
      },
    });
  };

  const validateAndSetDropDownData = async (e: any) => {
    const isValid = await validator.validate(e.target.value, e.target.name);
    setData({
      ...data,
      [e.target.name]: {
        value: e.target.value,
        valid: isValid?.status,
        required: true,
      },
    });
  };

  return (
    <div
      className="user-profile-account-info-component"
      data-testid="user-profile-account-info-component"
    >
      <h2
        className="user-profile-account-header"
        data-testid="user-profile-account-header"
      >
        Account Information
      </h2>
      <Grid
        container
        spacing={1}
        classes={{ root: "user-accountInfo-grid-container" }}
      >
        <Grid item className="grid-item-width">
          <InputWithLabel
            label="First name"
            isRequired={data?.firstName.required}
            error={data.firstName.valid === ValidationStatus.INVALID}
            testId="first-name-label"
          >
            <InputBase
              required={data.firstName.required}
              className="account-info-input"
              name="firstName"
              value={data.firstName.value}
              onChange={validateAndSetData}
              data-testid="acc-first-name"
              autoFocus
            />
          </InputWithLabel>
        </Grid>
        <Grid item className="grid-item-width">
          <InputWithLabel
            label="Last name"
            isRequired={data.lastName.required}
            error={data.lastName.valid === ValidationStatus.INVALID}
            testId="last-name-label"
          >
            <InputBase
              required={data.lastName.required}
              className="account-info-input"
              name="lastName"
              value={data.lastName.value}
              onChange={validateAndSetData}
              data-testid="acc-last-name"
            />
          </InputWithLabel>
        </Grid>
        <Grid item className="grid-item-width">
          <InputWithLabel
            label="Username"
            isRequired={data.userName.required}
            error={data.userName.valid === ValidationStatus.INVALID}
            errorMessage={data.userName?.errorMessage}
            testId="userName-name-label"
          >
            <InputBase
              required={data.userName.required}
              className="account-info-input"
              name="userName"
              readOnly={true}
              value={data.userName.value}
              onChange={validateAndSetData}
              data-testid="acc-user-name"
            />
          </InputWithLabel>
        </Grid>
        <Grid item className="grid-item-width">
          <InputWithLabel
            isRequired={data.licenseType.required}
            label="License type"
            sx={{ height: "40px" }}
            error={data.licenseType?.valid === ValidationStatus.INVALID}
            testId="license-type-label"
          >
            <CustomDropDown
              name="licenseType"
              value={data.licenseType.value}
              handleChange={validateAndSetDropDownData}
              selectpropsClassName="acount-info-select"
              selectClassName="account-info-input account-info"
              testId="acc-license-type"
              menuItem={licenseType}
            />
          </InputWithLabel>
        </Grid>
        <Grid item className="grid-item-width">
          <InputWithLabel
            isRequired={data.department.required}
            label="Department"
            error={data.department?.valid === ValidationStatus.INVALID}
            testId="department-label"
          >
            <CustomDropDown
              name="department"
              value={data.department.value}
              handleChange={validateAndSetDropDownData}
              selectpropsClassName="acount-info-select"
              selectClassName="account-info-input account-info"
              testId="acc-department-type"
              menuItem={department}
            />
          </InputWithLabel>
        </Grid>
        <Grid item className="grid-item-width">
          <InputWithLabel
            label="Title"
            isRequired={data.title.required}
            error={data.title.valid === ValidationStatus.INVALID}
            testId="title-label"
          >
            <InputBase
              className="account-info-input"
              name="title"
              required={data.title.required}
              value={data.title.value}
              onChange={validateAndSetData}
              data-testid="acc-title"
            />
          </InputWithLabel>
        </Grid>
        <Grid className="user-profile-contact-info" item xs={6}>
          <div
            className="user-profile-email-title"
            data-testid="user-profile-email-title"
          >
            Email Address
          </div>
          <div>
            <a
              className="user-profile-email"
              data-testid="user-profile-email"
              href={`mailto:${data.email.value}`}
            >
              {data.email.value}
            </a>
          </div>
        </Grid>
        <Grid className="user-profile-contact-info" item xs={5}>
          <div>
            <div
              data-testid="user-profile-phone-title"
              className="user-profile-phone-title"
            >
              Phone Number
            </div>
            <div
              className="user-profile-phone"
              data-testid="user-profile-phone"
            >
              {data.phone.value !== "" ? data.phone.value : "--"}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
