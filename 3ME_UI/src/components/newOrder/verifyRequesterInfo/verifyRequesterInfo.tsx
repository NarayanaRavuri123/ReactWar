import { Box, Grid, InputBase } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { NewOrderValidator } from "../newOrder.validator";
import { IVerifyRequesterInfo } from "./verifyRequesterInfo.interface";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { CustomCheckBox } from "../../../core/checkBox/checkBox.component";
import { FacilityInfoDetail } from "../../manageProfile/facilityInformation/facilityInfoDetail.component";
import { AddFacilityContext } from "../../manageProfile/facilityInformation/addFacilityContainer/addFacilityContainer.context";
import { IFacility } from "../../manageProfile/facilityInformation/facility.interface";
import { Validator } from "../../../util/order.validations";
import { Popup } from "../../../core/popup/popup.component";
import { AddFacilityContainer } from "../../manageProfile/facilityInformation/addFacilityContainer/addFacilityContainer.component";
import "./verifyRequesterInfo.css";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { VerifyRequesterInfoReviewOrder } from "./reviewOrder/verifyRequesterInfoReviewOrder.component";
import { IRequesterInfo } from "../newOrder.interface";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";

export const VerifyRequesterInfo = ({
  requesterInfo,
  requestValidator = new NewOrderValidator(),
  setRequesterInfo,
  isReviewOrder = false,
  editButtonClicked,
  isOrderSummary = false,
}: IVerifyRequesterInfo) => {
  const [validator] = React.useState<NewOrderValidator>(requestValidator!);
  const [facility, setFacility] = useState<IFacility>();
  const [open, setOpen] = useState<boolean>(false);
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const newOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  useEffect(() => {
    if (
      requesterInfo.requesterFacilityAsDefault === false &&
      requesterInfo.requesterFacility !== null
    ) {
      setFacility(requesterInfo.requesterFacility!);
    } else if (
      AuthObj?.userProfile?.facilities.length !== 0 ||
      AuthObj?.isInternalUser
    ) {
      updateRegisteredFacility();
    }
  }, [AuthObj?.userProfile?.facilities, AuthObj?.registeredFaciltyAddress]);

  useEffect(() => {
    if (
      requesterInfo.requesterFacilityAsDefault === false &&
      requesterInfo.requesterFacility !== null
    ) {
      setFacility(requesterInfo.requesterFacility!);
    }
  }, [requesterInfo.requesterFacility]);

  useEffect(() => {
    if (
      AuthObj?.userProfile &&
      !newOrderObj?.isComingFromPrev &&
      !isReviewOrder
    ) {
      if (
        requesterInfo!.IsRequesterSameasSubmitter.value.toLowerCase() === "yes"
      ) {
        updateRequesterBasicDetails();
      } else {
        resetRequesterBasicDetails();
      }
    }
  }, [AuthObj?.userProfile]);

  const validateAndSetData = (e: any) => {
    newOrderObj?.setIsHandleChangeTriggered(true);
    if (requesterInfo.IsRequesterSameasSubmitter.value === "yes") {
      return;
    }
    const isValid = validator.validate(e.target.value, e.target.name);
    setRequesterInfo((dt: IRequesterInfo) => ({
      ...dt,
      [e.target.name]: { value: e.target.value, valid: isValid?.status },
    }));
  };

  const updateRegisteredFacility = () => {
    if (AuthObj?.registeredFaciltyAddress) {
      const userFacility = AuthObj?.registeredFaciltyAddress!;
      requesterInfo.requesterFacility = userFacility;
      requesterInfo.requesterFacilityAsDefault = true;
      setFacility(userFacility);
    }
  };

  const updateRequesterBasicDetails = () => {
    if (AuthObj && AuthObj.userProfile) {
      if (AuthObj.userProfile.facilities.length !== 0) {
        updateRegisteredFacility();
      }
      const firstName = AuthObj.userProfile.firstName;
      const lastName = AuthObj.userProfile.lastName;
      const emailAddress = AuthObj.userProfile.emailAddress;
      setRequesterInfo((dt: IRequesterInfo) => ({
        ...dt,
        IsRequesterSameasSubmitter: {
          valid: ValidationStatus.VALID,
          value: "yes",
          isDefaultValid: true,
        },
        requesterFirstName: {
          valid:
            firstName !== ""
              ? ValidationStatus.VALID
              : ValidationStatus.UNTOUCHED,
          value: firstName,
        },
        requesterLastName: {
          valid:
            lastName !== ""
              ? ValidationStatus.VALID
              : ValidationStatus.UNTOUCHED,
          value: lastName,
        },
        requesterEmail: {
          valid:
            emailAddress !== ""
              ? ValidationStatus.VALID
              : ValidationStatus.UNTOUCHED,
          value: emailAddress,
        },
      }));
    }
  };

  const resetRequesterBasicDetails = () => {
    const defaultValue = {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
    };
    setRequesterInfo((dt: IRequesterInfo) => ({
      ...dt,
      IsRequesterSameasSubmitter: {
        valid: ValidationStatus.VALID,
        value: "no",
        isDefaultValid: true,
      },
      requesterFirstName: defaultValue,
      requesterLastName: defaultValue,
      requesterEmail: defaultValue,
    }));
  };

  const handlecheckBoxChange = async (e: any) => {
    if (e.target.checked) {
      updateRequesterBasicDetails();
    } else {
      resetRequesterBasicDetails();
    }
  };

  const changeFacilityButtonClick = () => {
    setOpen(true);
  };

  const addNewFacility = (newFacility: IFacility) => {
    setFacility(newFacility);
    requesterInfo.requesterFacility = newFacility;
    requesterInfo.requesterFacilityAsDefault = false;
    setOpen(false);
  };

  return (
    <div className="verify-requester-info-component">
      {!isReviewOrder && (
        <div className="verify-requester-info">
          <div className="verify-requester-info-header">
            <div className="verify-requester-info-title-div">
              <h2
                className="verify-requester-info-title"
                data-testid="verify-requester-infoTest"
              >
                Verify Requester Info
              </h2>
            </div>
          </div>
          <Box
            className="verify-requester-info-box-container"
            sx={{ flexGrow: 1 }}
          >
            <Grid
              className="verify-requester-info-grid-container"
              container
              spacing={1}
            >
              <Grid>
                <CustomCheckBox
                  checked={
                    requesterInfo.IsRequesterSameasSubmitter.value === "yes"
                  }
                  value={requesterInfo.IsRequesterSameasSubmitter.value}
                  handleChange={handlecheckBoxChange}
                  selectClassName="verifyRequesterCheckBox"
                  selectpropsClassName="verifyRequesterCheckBoxChkBoxRoot"
                  labelClassName="verifychkBoxDescriptionLabel"
                  labelText="Requester same as submitter"
                  name="IsRequesterSameasSubmitter"
                  testId="verifyRequesterCheckBoxTest"
                />
              </Grid>
            </Grid>
          </Box>
          <div className="mainGridVerifyContainer">
            <Grid
              container
              spacing={2}
              classes={{ root: "verify-requester-component" }}
            >
              <Grid item xs={6}>
                <InputWithLabel
                  label="Requester Name"
                  isRequired={true}
                  error={
                    requesterInfo.requesterFirstName.valid ===
                    ValidationStatus.INVALID
                  }
                >
                  <InputBase
                    className="verify-requester-input"
                    readOnly={
                      requesterInfo.IsRequesterSameasSubmitter.value === "yes"
                    }
                    name="requesterFirstName"
                    value={requesterInfo.requesterFirstName.value}
                    onChange={validateAndSetData}
                    data-testid="requesterFirstNameTest"
                  />
                </InputWithLabel>
              </Grid>
              <Grid item xs={6}>
                <InputWithLabel
                  label="Requester Last Name"
                  isRequired={true}
                  error={
                    requesterInfo.requesterLastName.valid ===
                    ValidationStatus.INVALID
                  }
                >
                  <InputBase
                    className="verify-requester-input"
                    readOnly={
                      requesterInfo.IsRequesterSameasSubmitter.value === "yes"
                    }
                    name="requesterLastName"
                    value={requesterInfo.requesterLastName.value}
                    onChange={validateAndSetData}
                    data-testid="requesterLastNameTest"
                  />
                </InputWithLabel>
              </Grid>
              <Grid item xs={6}>
                <InputWithLabel
                  label="Requester Email"
                  isRequired={true}
                  error={
                    requesterInfo.requesterEmail.valid ===
                    ValidationStatus.INVALID
                  }
                >
                  <InputBase
                    className="verify-requester-input"
                    readOnly={
                      requesterInfo.IsRequesterSameasSubmitter.value === "yes"
                    }
                    name="requesterEmail"
                    onChange={validateAndSetData}
                    value={requesterInfo.requesterEmail.value}
                  />
                </InputWithLabel>
              </Grid>
            </Grid>
            <Grid
              className="verify-requester-facility-component"
              container
              spacing={2}
            >
              <Grid
                className="verify-requester-facility-grid-item"
                item
                xs={12}
              >
                <div className="facilityDetail">
                  {facility && (
                    <FacilityInfoDetail
                      facilityInfo={facility}
                      index={0}
                      key={0}
                      openConfirmationBox={null}
                      showTrash={false}
                    />
                  )}
                </div>
              </Grid>
              {requesterInfo.IsRequesterSameasSubmitter.value !== "yes" && (
                <ExpressButton
                  variant="outlined"
                  parentClass="changefacilitybtn"
                  testId="ChangeFacilityTest"
                  clickHandler={changeFacilityButtonClick}
                >
                  Change Facility
                </ExpressButton>
              )}
            </Grid>
            <AddFacilityContext.Provider
              value={{
                closePopup: () => setOpen(false),
                facilitySearchValidator: new Validator(),
                addFacilityToList: addNewFacility,
              }}
            >
              <Popup
                dialogParentClass="add-facility-popup"
                openFlag={open}
                closeHandler={() => setOpen(false)}
              >
                <AddFacilityContainer isForNewOrder={true} />
              </Popup>
            </AddFacilityContext.Provider>
          </div>
        </div>
      )}
      {isReviewOrder && (
        <VerifyRequesterInfoReviewOrder
          data={requesterInfo}
          facility={requesterInfo.requesterFacility}
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
        />
      )}
    </div>
  );
};
