import { useState } from "react";
import "./emailNotificationPreference.css";
import { Preference } from "./preference/preference.component";
import { ManageProfileValidator } from "../manageProfile.validator";
import { IEmailNotificationPreferencesInterface } from "./emailNotificationPreference.interface";

export const EmailNotificationPreference = ({
  manageProfileData,
  Validator = new ManageProfileValidator(),
  setManageProfileData,
}: IEmailNotificationPreferencesInterface) => {
  const [validator] = useState<ManageProfileValidator>(Validator);

  const validateAndSetData = (e: any) => {
    const isValid = validator.validate(e.target.value, e.target.name);
    setManageProfileData(
      Object.assign({}, manageProfileData, {
        [e.target.name]: { value: e.target.value, valid: isValid?.status },
      })
    );
  };

  return (
    <div
      className="email-notification-prefereces"
      data-testid="email-notification-prefereces"
    >
      <h2
        className="email-notification-preferences-header"
        data-testid="email-notification-preferences-header"
      >
        Email notification preferences
      </h2>
      <h5
        className="email-notification-preferences-body"
        data-testid="email-notification-preferences-body"
      >
        The selections below control which emails you receive as notification of
        actions you take as a user.
      </h5>
      <Preference
        title="Rental activity: Home"
        name="rentalActivity"
        value={manageProfileData?.rentalActivity.value ?? ""}
        setPreferencesData={validateAndSetData}
      />
      <Preference
        title="Sales Activity"
        name="salesActivity"
        value={manageProfileData?.salesActivity.value ?? ""}
        setPreferencesData={validateAndSetData}
      />
      <Preference
        title="Pickup Requests"
        name="pickUpRequest"
        value={manageProfileData?.pickUpRequest.value ?? ""}
        setPreferencesData={validateAndSetData}
      />
      <p
        className="email-notification-preferences-description"
        data-testid="email-notification-preferences-description"
      >
        For any questions regarding your account, please contact 3M™ Medical
        Solutions Customer Support at{" "}
        <span className="bolder" data-testid="phone-number-bold">
          1-800-275-4524
        </span>{" "}
        extension 41858
      </p>
    </div>
  );
};
