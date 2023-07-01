import {
  FormControlLabel,
  Grid,
  InputBase,
  Radio,
  RadioGroup,
} from "@mui/material";
import "./inventoryRequest.css";
import {
  IInventoryRequest,
  IInventoryRequestProps,
} from "./inventoryRequest.interface";
import InputMask from "react-input-mask";
import {
  InventoryContext,
  InventoryContextType,
} from "../../../context/InventoryContext";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Popup } from "../../../core/popup/popup.component";
import { getDeepClone } from "../../../util/ObjectFunctions";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import { InventoryRequestValidator } from "./inventoryRequest.validator";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { submitInventoryAdjustment } from "../../../util/inventoryMgrService";
import { Navigator } from "../../helpAndSupport/Navigator/navigator.component";
import QuantityButton from "../../../core/quantityButton/quantityButton.component";
import { ReactComponent as RadioButtonIcon } from "../../../assets/radioButton.svg";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { SendNoteFailure } from "../../send3MNote/popUps/failurePopUp/sendNoteFailure.component";
import { InventoryRequestSucuess } from "./popUps/successPopUp/inventoryRequestSuccess.component";
import { FooterButtonGroup } from "../../send3MNote/footerButtonGroup/footerButtonGroup.component";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../assets/selectedRadioButton.svg";

export const InventoryRequest = ({
  cancelBtnAction,
  decrementButtonDisabled = true,
  incrementButtonDisabled = false,
  submitBtnAction,
  Validator = new InventoryRequestValidator(),
}: IInventoryRequestProps) => {
  const history = useHistory();
  const [active, setActive] = useState<boolean | null>(null);
  const [validator] = useState<InventoryRequestValidator>(Validator!);
  const [openSuccessPopUp, setOpenSuccessPopUp] = useState<boolean>(false);
  const [focusClasses, setFocusClasses] = useState({
    phone: "",
  });
  const [isDecrementButtonDisabled, setIsDecrementButtonDisabled] =
    useState<boolean>(decrementButtonDisabled);
  const [isIncrementButtonDisabled, setIsIncrementButtonDisabled] =
    useState<boolean>(incrementButtonDisabled);
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const inventoryObj = useContext<InventoryContextType | null>(
    InventoryContext
  );
  const [openLoaderPopUp, setOpenLoaderPopUp] = useState<boolean>(false);
  const [openFailurePopUp, setOpenFailurePopUp] = useState<boolean>(false);

  const data = inventoryObj!.data;
  const setData = inventoryObj!.setData;

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const checkIsUserIsUpdateForm = (): boolean => {
    const temp = getDeepClone(data);
    const isFormUpdated = Object.keys(temp).some(
      (x: string) =>
        x !== "requestType" && temp[x].valid !== ValidationStatus.UNTOUCHED
    );
    return isFormUpdated;
  };

  const callSumbitInventoryAPI = async (params: any) => {
    setOpenLoaderPopUp(true);
    const submitInventoryResult = await submitInventoryAdjustment(params);
    setOpenLoaderPopUp(false);
    if (submitInventoryResult && submitInventoryResult.succeeded) {
      setOpenSuccessPopUp(true);
    } else {
      setOpenFailurePopUp(true);
    }
  };

  const validateAndSetData = (e: any) => {
    let { name, required, value } = e.target;
    if (
      name === "phone" &&
      data?.phone.valid === ValidationStatus.UNTOUCHED &&
      (value === "(___) ___-____" || value === "")
    ) {
      return;
    }
    if (name === "requestType") {
      if (value === "Add Inventory") {
        setActive(true);
      } else if (value === "Remove Inventory") {
        setActive(false);
      } else {
        setActive(null);
      }
    }
    let isValid = validator.validate(value, name);
    setData((dt: IInventoryRequest) => ({
      ...dt,
      [name]: {
        value: value,
        valid: isValid!.status,
        required: name === "extension" && value.length > 0 ? true : required,
      },
    }));
  };

  const incrementButtonClicked = () => {
    const oldQuantity =
      data?.quantity.value.length > 0 ? data?.quantity.value : "0";
    const qunatityPlus = parseInt(oldQuantity) + 1;
    if (qunatityPlus === 15) {
      setIsIncrementButtonDisabled(true);
    } else if (qunatityPlus > 0) {
      setIsDecrementButtonDisabled(false);
    }
    setData((dt: IInventoryRequest) => ({
      ...dt,
      quantity: {
        value: `${qunatityPlus}`,
        valid:
          qunatityPlus === 0
            ? ValidationStatus.INVALID
            : ValidationStatus.VALID,
        required: true,
      },
    }));
  };

  const decrementButtonClicked = () => {
    const oldQuantity =
      data?.quantity.value.length > 0 ? data?.quantity.value : "0";
    const qunatityMinus = parseInt(oldQuantity) - 1;
    if (qunatityMinus === 0) {
      setIsDecrementButtonDisabled(true);
    } else if (qunatityMinus < 15) {
      setIsIncrementButtonDisabled(false);
    }
    setData((dt: IInventoryRequest) => ({
      ...dt,
      quantity: {
        value: `${qunatityMinus}`,
        valid:
          qunatityMinus === 0
            ? ValidationStatus.INVALID
            : ValidationStatus.VALID,
        required: true,
      },
    }));
  };

  const cancelInventoryRequest = () => {
    history.goBack();
  };

  const submitRequest = async () => {
    const isValid = validator.validateAll(data, setData);
    if (
      isValid &&
      authObj &&
      authObj.userProfile &&
      authObj.registeredFaciltyAddress &&
      authObj.registeredFaciltyAddress.siteUseId
    ) {
      let submitInventoryRequest = {
        UserName: authObj.userProfile.userName,
        TemplateCode: "SEND_INVENTORY_ADJUSTMENT_REQUEST",
        EmailParameters: {
          RequestType: data.requestType.value,
          SiteUseId: authObj.registeredFaciltyAddress.siteUseId,
          Quantity: data.quantity.value,
        },
      };
      callSumbitInventoryAPI(submitInventoryRequest);
    }
  };

  useEffect(() => {
    if (
      authObj &&
      authObj.registeredFaciltyAddress &&
      authObj.registeredFaciltyAddress.readyCareFlag &&
      authObj.registeredFaciltyAddress.readyCareFlag !== "Y"
    ) {
      history.push("/home");
    }
  }, [authObj?.registeredFaciltyAddress]);

  useEffect(() => {
    if (
      data &&
      (data.requestType.value === "Add Inventory" ||
        data.requestType.value === "Remove Inventory")
    ) {
      setActive(data.requestType.value === "Add Inventory" ? true : false);
    }
    if (data && data.quantity.value.length > 0) {
      const quantityStr =
        data?.quantity.value.length > 0 ? data?.quantity.value : "0";
      const quantity = parseInt(quantityStr);
      setIsDecrementButtonDisabled(quantity === 0);
      setIsIncrementButtonDisabled(quantity === 15);
    }
    if (authObj && authObj.userProfile && !checkIsUserIsUpdateForm()) {
      const profile = authObj.userProfile;
      const nameValue = profile.firstName
        ? profile.firstName +
          `${profile.lastName ? ` ${profile.lastName}` : ""}`
        : `${profile.lastName ? `${profile.lastName}` : ""}`;
      const nameValid = validator.validate(nameValue, "name")!.status;
      const phoneValue =
        profile.phoneNo && profile.phoneNo !== ""
          ? profile.phoneNo.slice(-10)
          : profile.mobilePhoneNo.slice(-10);
      const phoneValid = validator.validate(phoneValue, "phone")!.status;
      const extensionValue = profile.extension;
      const extensionValid = validator.validate(
        extensionValue,
        "extension"
      )!.status;
      const emailValue = profile.emailAddress;
      const emailValid = validator.validate(emailValue, "email")!.status;
      setData((dt: IInventoryRequest) => ({
        ...dt,
        name: {
          value: nameValue,
          valid:
            nameValid === ValidationStatus.INVALID
              ? ValidationStatus.UNTOUCHED
              : ValidationStatus.VALID,
          required: true,
        },
        phone: {
          value: phoneValue,
          valid:
            phoneValid === ValidationStatus.INVALID
              ? ValidationStatus.UNTOUCHED
              : ValidationStatus.VALID,
          required: true,
        },
        extension: {
          value: extensionValue,
          valid:
            extensionValid === ValidationStatus.INVALID
              ? ValidationStatus.UNTOUCHED
              : ValidationStatus.VALID,
          required: extensionValue.length > 0,
        },
        email: {
          value: emailValue,
          valid:
            emailValid === ValidationStatus.INVALID
              ? ValidationStatus.UNTOUCHED
              : ValidationStatus.VALID,
          required: true,
        },
      }));
    }
  }, [authObj]);

  return (
    <div className="inventory-request-component">
      <div className="short-form">
        <Navigator
          array={[
            {
              route: "/inventory",
              pageName: "Inventory",
            },
          ]}
          className="inventory-adjustment-route-section"
          title="Inventory Adjustment"
        />
        <div className="inventory-request-header">
          <h2
            className="inventory-request-header-title"
            data-testid="inventory-request-header-title"
          >
            Inventory Adjustment Request
          </h2>
          <h5
            className="inventory-request-header-description-1"
            data-testid="inventory-request-header-description-1"
          >
            Please complete this form if you would like to increase or decrease
            the inventory stock level of VACs used for Ready Care™ in your
            facility. A change to your inventory stock level may affect the
            frequency of replenishment and will also adjust your disposable
            inventory level.
          </h5>
          <h5
            className="inventory-request-header-description-2"
            data-testid="inventory-request-header-description-2"
          >
            If you are in immediate need of units, contact the 3M™ Express
            Support team at{" "}
            <a
              className="phone-value"
              data-testid="phone-value"
              href={`tel:8002754524`}
            >
              (800) 275-4524
            </a>{" "}
            ext. 41858 or{" "}
            <a
              className="email-value"
              data-testid="email-value"
              href={`mailto:kciexpress@kci1.com.`}
            >
              kciexpress@kci1.com.
            </a>
          </h5>
        </div>
        <div className="inventory-request-type">
          <Grid
            className="inventory-request-grid-container"
            container
            spacing={2}
          >
            <Grid className="inventory-request-grid-item" item xs={8}>
              <InputWithLabel
                label="Request Type"
                isRequired={true}
                error={data?.requestType.valid === ValidationStatus.INVALID}
                testId="inventory-request-type"
              >
                <RadioGroup
                  name="requestType"
                  classes={{ root: "radioRoot" }}
                  onChange={validateAndSetData}
                  value={data?.requestType.value}
                >
                  <FormControlLabel
                    classes={{
                      root:
                        active === true ? "optionRoot-active" : "optionRoot",
                    }}
                    componentsProps={{
                      typography: {
                        classes: {
                          root:
                            active === true ? "optiontxtSelect" : "optiontxt",
                        },
                      },
                    }}
                    control={
                      <Radio
                        data-testid="radio-yes"
                        icon={<RadioButtonIcon />}
                        checkedIcon={<SelectedRadioButtonIcon />}
                      />
                    }
                    data-testid="inventory-request-type-yes"
                    label="Add Inventory"
                    value="Add Inventory"
                  />
                  <FormControlLabel
                    classes={{
                      root:
                        active === false ? "optionRoot-active" : "optionRoot",
                    }}
                    componentsProps={{
                      typography: {
                        classes: {
                          root:
                            active === false ? "optiontxtSelect" : "optiontxt",
                        },
                      },
                    }}
                    control={
                      <Radio
                        data-testid="radio-no"
                        icon={<RadioButtonIcon />}
                        checkedIcon={<SelectedRadioButtonIcon />}
                      />
                    }
                    data-testid="inventory-request-type-no"
                    label="Remove Inventory"
                    value="Remove Inventory"
                  />
                </RadioGroup>
              </InputWithLabel>
            </Grid>
          </Grid>
        </div>
        <div className="inventory-request-add-quantity">
          <InputWithLabel
            label={`Quantity to ${
              data?.requestType.value === "Add Inventory" ? "add" : "remove"
            }`}
            isRequired={true}
            error={data?.quantity.valid === ValidationStatus.INVALID}
            testId="inventory-request-quantity"
          >
            <div className="inventory-request-quantity-div">
              <QuantityButton
                value={data.quantity.value}
                onPlusClick={incrementButtonClicked}
                onMinusClick={decrementButtonClicked}
                isPlusDisabled={isIncrementButtonDisabled}
                isMinusDisabled={isDecrementButtonDisabled}
                showLabel={false}
              />
            </div>
          </InputWithLabel>
        </div>
        <div className="inventory-requester-information">
          <h2
            className="inventory-requester-information-title"
            data-testid="inventory-requester-information-title"
          >
            Requester Information
          </h2>
          <h4
            className="inventory-requester-information-description"
            data-testid="inventory-requester-information-description"
          >
            The person indicated below will be contacted within 2 business days.
          </h4>
          <Grid
            className="inventory-request-grid-container"
            container
            spacing={2}
          >
            <Grid className="inventory-request-grid-item" item xs={8}>
              <InputWithLabel
                label="Contact Name"
                isRequired={data?.name.required}
                error={data?.name.valid === ValidationStatus.INVALID}
                testId="inventory-requester-information-name"
              >
                <InputBase
                  className="inventory-requester-information-input"
                  inputProps={{
                    "data-testid": "inventory-requester-information-name-value",
                  }}
                  name="name"
                  onChange={validateAndSetData}
                  required={data?.name.required}
                  value={data?.name.value}
                />
              </InputWithLabel>
            </Grid>
            <Grid className="inventory-request-grid-item" item xs={6}>
              <InputWithLabel
                label="Contact Phone"
                labelClassName={focusClasses.phone}
                isRequired={data?.phone.required}
                error={data?.phone.valid === ValidationStatus.INVALID}
                testId="inventory-requester-information-phone"
              >
                <InputMask
                  className="phone"
                  data-testid="inventory-requester-information-phone-value"
                  mask="(999) 999-9999"
                  name="phone"
                  onChange={validateAndSetData}
                  onFocus={(e) => setClasses(e, "Mui-focused")}
                  onBlur={(e) => setClasses(e, "")}
                  placeholder="(___) ___-____"
                  required={data?.phone.required}
                  value={data?.phone.value}
                />
              </InputWithLabel>
            </Grid>
            <Grid className="inventory-request-grid-item" item xs={2}>
              <InputWithLabel
                label="Ext"
                isRequired={false}
                error={data?.extension.valid === ValidationStatus.INVALID}
                testId="inventory-requester-information-extension"
              >
                <InputBase
                  className="inventory-requester-information-input"
                  inputProps={{
                    "data-testid":
                      "inventory-requester-information-extension-value",
                  }}
                  name="extension"
                  onChange={validateAndSetData}
                  required={data?.extension.required}
                  value={data?.extension.value}
                />
              </InputWithLabel>
            </Grid>
            <Grid className="inventory-request-grid-item" item xs={8}>
              <InputWithLabel
                label="Email Address"
                isRequired={data?.email.required}
                error={data?.email.valid === ValidationStatus.INVALID}
                testId="inventory-requester-information-email"
              >
                <InputBase
                  className="inventory-requester-information-input"
                  inputProps={{
                    "data-testid":
                      "inventory-requester-information-email-value",
                  }}
                  name="email"
                  onChange={validateAndSetData}
                  required={data?.email.required}
                  value={data?.email.value}
                />
              </InputWithLabel>
            </Grid>
          </Grid>
        </div>
      </div>
      <FooterButtonGroup
        firstButtonTitle="Cancel"
        firstButtonAction={
          cancelBtnAction ? cancelBtnAction : cancelInventoryRequest
        }
        secondButtonTitle="Submit Request"
        secondButtonDisabled={false}
        secondButtonAction={submitBtnAction ? submitBtnAction : submitRequest}
      />
      <Popup
        openFlag={openLoaderPopUp}
        closeHandler={() => setOpenLoaderPopUp(false)}
        dialogParentClass={"send-note-loader-pop-up"}
        data-testid="loader-pop-up"
        hideCloseButton={true}
      >
        <div className="send-note-loader">
          <LoadingSpinner />
        </div>
      </Popup>
      <Popup
        openFlag={openSuccessPopUp}
        closeHandler={() => setOpenSuccessPopUp(false)}
        dialogParentClass={"inventory-request-success-pop-up"}
        data-testid="success-pop-up"
        hideCloseButton={true}
      >
        <div>
          <InventoryRequestSucuess
            backButtonAction={() => {
              history.goBack();
            }}
          />
        </div>
      </Popup>
      <Popup
        openFlag={openFailurePopUp}
        closeHandler={() => setOpenFailurePopUp(false)}
        dialogParentClass={"send-note-failure-pop-up"}
        data-testid="failure-pop-up"
      >
        <div>
          <SendNoteFailure
            message="Your request to submit the inventory adjustment has failed. Please try again or contact
        3M for assistance 1-800-275-4524."
            backButtonAction={() => setOpenFailurePopUp(false)}
          />
        </div>
      </Popup>
    </div>
  );
};
