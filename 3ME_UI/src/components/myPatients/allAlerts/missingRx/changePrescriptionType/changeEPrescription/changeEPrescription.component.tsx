import "./changeEPrescription.css";
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import RedCheck from "../../../../../../assets/redCheck.svg";
import { NewOrderValidator } from "../../../../../newOrder/newOrder.validator";
import {
  IInputField,
  ValidationStatus,
} from "../../../../../../core/interfaces/input.interface";
import { ReactComponent as CloseIcon } from "../../../../../../assets/popupcloseicon.svg";
import { ExpressButton } from "../../../../../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../../../../../core/inputWithLabel/inputWithLabel.component";
import { IPrescriberDetailInterface } from "../../missingRxEPrescription/prescriberDetail.interface";
import {
  getUntouchedObj,
  makeCapitalEachWordInString,
} from "../../../../../../util/utilityFunctions";
import { MissingRxSection } from "../../missingRx.enum";

type Props = {
  changePopUpSection: Function;
  closeEmailUpdateClicked?: any;
  editEmailClicked?: any;
  editPrescriberMode: boolean;
  isComingFromChangePrescription?: boolean;
  prescriberDetails: IPrescriberDetailInterface;
  resendPrescriptionClicked?: any;
  showErrorMessage: boolean;
  setPrescriberDetails: React.Dispatch<
    React.SetStateAction<IPrescriberDetailInterface>
  >;
  setEditPrescriberMode: Function;
  updatePrescriptionClicked?: any;
};

const ChangeEPrescription = ({
  prescriberDetails,
  setPrescriberDetails,
  editPrescriberMode,
  setEditPrescriberMode,
  editEmailClicked = null,
  resendPrescriptionClicked = null,
  updatePrescriptionClicked = null,
  closeEmailUpdateClicked = null,
  changePopUpSection,
  isComingFromChangePrescription = false,
  showErrorMessage,
}: Props) => {
  const [validator] = useState<NewOrderValidator>(new NewOrderValidator()!);
  const [backedUpEmailID, setBackedUpEmailID] = useState<IInputField>();

  const editEmailAction = () => {
    setEditPrescriberMode(true);
    setBackedUpEmailID(prescriberDetails.updatedPrescriberEmail);
  };

  const resendPrescriptionAction = () => {
    setEditPrescriberMode(false);
  };

  const updatePrescriptionAction = () => {
    setEditPrescriberMode(false);
    if (!isComingFromChangePrescription) {
      changePopUpSection(MissingRxSection.E_PRESBRIBER_SENT);
    }
  };

  const closeEmailUpdateAction = () => {
    setEditPrescriberMode(false);
    prescriberDetails.updatedPrescriberEmail.value = backedUpEmailID!.value;
    prescriberDetails.updatedPrescriberEmail.valid = backedUpEmailID!.valid;
  };

  const ValidateAndSetData = (e: any) => {
    const isValid = validator.validate(e.target.value, e.target.name);
    setPrescriberDetails(
      Object.assign({}, prescriberDetails, {
        [e.target.name]: {
          value: e.target.value,
          valid: isValid!.status,
        },
      })
    );
  };

  const prescriberReviewMode = () => {
    return (
      <div className="ct-prescriberBox" data-testid="prescriber-review-mode">
        <div>{showErrorMessage && showError()}</div>
        <div className="ct-prescriberBox-detail">
          <div className="ct-prescriber-name">
            <div
              className="ct-headerdetail"
              data-testid="prescriber-name-title"
            >
              Prescriber Name
            </div>
            <div
              className="ct-prescriberValues"
              data-testid="prescriber-name-value"
            >
              {prescriberDetails.prescriberName.value !== ""
                ? makeCapitalEachWordInString(
                    prescriberDetails.prescriberName.value
                  )
                : "--"}
            </div>
          </div>
          <div className="ct-prescriber-email">
            <div
              className="ct-headerdetail"
              data-testid="prescriber-email-title"
            >
              Prescriber Email Address
            </div>
            <div
              className="ct-prescriberValues email"
              data-testid="prescriber-email-value"
            >
              {prescriberDetails.updatedPrescriberEmail.value &&
              prescriberDetails.updatedPrescriberEmail.value !== ""
                ? prescriberDetails.updatedPrescriberEmail.value
                : "--"}
            </div>
          </div>
          {!showErrorMessage && (
            <div className="ct-prescriber-buttons">
              <div
                className="ct-editPrescriber"
                data-testid="prescriber-edit-button"
                onClick={editEmailClicked ? editEmailClicked : editEmailAction}
              >
                edit
              </div>
              <ExpressButton
                clickHandler={
                  resendPrescriptionClicked
                    ? resendPrescriptionClicked
                    : resendPrescriptionAction
                }
                parentClass="resendButton"
                testId="prescriber-resend-button"
                variant="contained"
              >
                resend
              </ExpressButton>
            </div>
          )}
        </div>
      </div>
    );
  };

  const prescriberEditMode = () => {
    return (
      <div className="ct-prescriberEditBox" data-testid="prescriber-edit-mode">
        <div className="ct-prescriberEditBox-detail">
          <div className="ct-prescriber-name-edit">
            <div
              className="ct-headerdetail"
              data-testid="prescriber-name-title"
            >
              Prescriber Name
            </div>
            <div
              className="ct-prescriberValues"
              data-testid="prescriber-name-value"
            >
              {prescriberDetails.prescriberName.value !== ""
                ? makeCapitalEachWordInString(
                    prescriberDetails.prescriberName.value
                  )
                : "--"}
            </div>
          </div>
          <div className="ct-prescriber-email-edit">
            <InputWithLabel
              label="Prescriber Email Address"
              isRequired={true}
              error={
                prescriberDetails.updatedPrescriberEmail.valid ===
                ValidationStatus.INVALID
              }
              testId="prescriber-email-title"
            >
              <InputBase
                className="ct-pescriber-email-input"
                id="pescriber-email-input"
                name="updatedPrescriberEmail"
                onChange={ValidateAndSetData}
                inputProps={{
                  "data-testid": "prescriber-email-value",
                }}
                value={prescriberDetails.updatedPrescriberEmail.value}
              />
            </InputWithLabel>
          </div>
          <div className="ct-prescriber-edit-buttons">
            <ExpressButton
              parentClass="ct-updateButton"
              clickHandler={
                updatePrescriptionClicked
                  ? updatePrescriptionClicked
                  : updatePrescriptionAction
              }
              variant="outlined"
              disabled={
                prescriberDetails.updatedPrescriberEmail.valid ===
                  ValidationStatus.INVALID ||
                !prescriberDetails.updatedPrescriberEmail.value ||
                prescriberDetails.updatedPrescriberEmail.value === ""
              }
              testId="prescriber-update-button"
            >
              update
            </ExpressButton>
            <div className="ct-closeIconBtn">
              <IconButton
                aria-label="close"
                onClick={
                  closeEmailUpdateClicked
                    ? closeEmailUpdateClicked
                    : closeEmailUpdateAction
                }
                sx={{ padding: 0 }}
                data-testid="popupCloseIcon"
                className="popupCloseIcon"
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const showError = () => {
    return (
      <div className="error-message-div">
        <img
          style={{ verticalAlign: "text-bottom", marginRight: "5px" }}
          src={RedCheck}
          alt={RedCheck}
        />
        <h4 className="error-message" data-testid="error-message">
          This email address has been rejected. Please change the prescription
          type or call{" "}
          <span className="error-message-phone">1-800-275-4524 ext 41858</span>{" "}
          for help.
        </h4>
      </div>
    );
  };

  return (
    <div className="change-e-prescription-component">
      {editPrescriberMode ? prescriberEditMode() : prescriberReviewMode()}
    </div>
  );
};

export default ChangeEPrescription;
