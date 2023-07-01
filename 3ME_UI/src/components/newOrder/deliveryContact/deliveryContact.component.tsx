import "./deliveryContact.css";
import { useContext, useState } from "react";
import InputMask from "react-input-mask";
import { Grid, InputBase } from "@mui/material";
import { NewOrderValidator } from "../newOrder.validator";
import { IDeliveryContactInfo } from "./deliveryContact.interface";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { DeliveryContactReviewOrder } from "./reviewOrder/deliveryContactReviewOrder.component";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";

export const DeliveryContact = ({
  data,
  Validator = new NewOrderValidator(),
  setData,
  isReviewOrder = false,
  editButtonClicked,
  isOrderSummary = false,
}: IDeliveryContactInfo) => {
  const [validator] = useState<NewOrderValidator>(Validator!);
  const [focusClasses, setFocusClasses] = useState({
    deliveryContactPhone: "",
  });
  const newOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const validateAndSetData = (e: any) => {
    newOrderObj?.setIsHandleChangeTriggered(true);
    if (
      e.target.name === "deliveryContactPhone" &&
      data.deliveryContactPhone.valid === ValidationStatus.UNTOUCHED &&
      (e.target.value === "(___) ___-____" || e.target.value === "")
    ) {
      return;
    }
    const isValid = validator.validate(e.target.value, e.target.name);
    setData(
      Object.assign({}, data, {
        [e.target.name]: { value: e.target.value, valid: isValid?.status },
      })
    );
  };

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  return (
    <div className="deliveryContactMain-component">
      {!isReviewOrder && (
        <div className="deliveryContactMain">
          <h2
            className="deliveryContactHeader"
            data-testid="deliveryContactHeaderTest"
          >
            Delivery Contact
          </h2>
          <Grid
            container
            spacing={2}
            classes={{ root: "delivery-contact-component" }}
          >
            <Grid item xs={6}>
              <InputWithLabel
                label="First Name"
                isRequired={true}
                error={
                  data?.deliveryContactFirstName.valid ===
                  ValidationStatus.INVALID
                }
              >
                <InputBase
                  className="delivery-information-input"
                  name="deliveryContactFirstName"
                  value={data?.deliveryContactFirstName.value}
                  onChange={validateAndSetData}
                  data-testid="deliveryContactFirstNameTest"
                />
              </InputWithLabel>
            </Grid>
            <Grid item xs={6}>
              <InputWithLabel
                label="Last Name"
                isRequired={true}
                error={
                  data?.deliveryContactLastName?.valid ===
                  ValidationStatus.INVALID
                }
              >
                <InputBase
                  className="delivery-information-input"
                  name="deliveryContactLastName"
                  value={data?.deliveryContactLastName?.value}
                  onChange={validateAndSetData}
                  data-testid="deliveryContactLastNameTest"
                />
              </InputWithLabel>
            </Grid>
            <Grid item xs={6}>
              <InputWithLabel
                label="Phone Number"
                labelClassName={focusClasses.deliveryContactPhone}
                isRequired={true}
                error={
                  data?.deliveryContactPhone.valid === ValidationStatus.INVALID
                }
              >
                <InputMask
                  placeholder="(___) ___-____"
                  className="phone"
                  name="deliveryContactPhone"
                  mask="(999) 999-9999"
                  value={data?.deliveryContactPhone.value}
                  onChange={validateAndSetData}
                  onBlur={(e) => setClasses(e, "")}
                  onFocus={(e) => setClasses(e, "Mui-focused")}
                  data-testid="deliveryContactPhoneNumberTest"
                />
              </InputWithLabel>
            </Grid>
            <Grid item xs={10}>
              <InputWithLabel
                labelClassName="deliveryInstructionLabel"
                label="Delivery Instructions"
                isRequired={false}
                error={
                  data?.deliveryInstructions.valid === ValidationStatus.INVALID
                }
              >
                <InputBase
                  className="deliveryInstructions-input"
                  inputProps={{
                    className:
                      data?.deliveryInstructions.valid ===
                      ValidationStatus.INVALID
                        ? "showDeliveryInstructionError"
                        : "noDeliveryInstructionError",
                  }}
                  name="deliveryInstructions"
                  value={data?.deliveryInstructions?.value}
                  onChange={validateAndSetData}
                  data-testid="deliveryinstructionTest"
                  multiline={true}
                  rows={2}
                  error={
                    data?.deliveryInstructions.valid ===
                    ValidationStatus.INVALID
                  }
                />
              </InputWithLabel>
            </Grid>
          </Grid>
        </div>
      )}
      {isReviewOrder && (
        <DeliveryContactReviewOrder
          data={data}
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
        />
      )}
    </div>
  );
};
