// Mui imports
import { TextField } from "@mui/material";
import quantityplusactive from "../../assets/quantityplusactive.svg";
import quantityminusactive from "../../assets/quantityminusactive.svg";
import minusbuttondisabled from "../../assets/minusbuttondisabled.svg";
import plusbuttondisabled from "../../assets/plusbuttondisabled.svg";
import { InputWithLabel } from "../inputWithLabel/inputWithLabel.component";
import "./quantityButton.css";

const QuantityButton = ({
  value,
  onPlusClick,
  onMinusClick,
  isPlusDisabled,
  isMinusDisabled,
  showLabel,
}: any) => {
  return (
    <div className="gridMain">
      {isMinusDisabled ? (
        <img
          data-testid="minus-button-disabled"
          src={minusbuttondisabled}
          alt={minusbuttondisabled}
          className="quantityStepper"
        ></img>
      ) : (
        <img
          data-testid="minus-button"
          src={quantityminusactive}
          alt={quantityminusactive}
          className="quantityStepper"
          onClick={onMinusClick}
        ></img>
      )}

      <InputWithLabel
        label="Quantity"
        isRequired={false}
        labelClassName={showLabel ? "quantityLabel" : "quantityLabelDisabled"}
        sx={{ width: "40px" }}
      >
        <TextField
          className="quantityInput"
          name="firstName"
          value={value}
          inputProps={{
            className: "quantityInputRoot",
            "data-testid": "quantityInput",
          }}
          InputProps={{
            classes: {
              root: "QuantityInputOutline",
            },
          }}
          disabled={true}
          placeholder="0"
        />
      </InputWithLabel>
      {isPlusDisabled ? (
        <img
          data-testid="plus-button-disabled"
          src={plusbuttondisabled}
          alt={plusbuttondisabled}
          className="quantityStepperdisabled"
        ></img>
      ) : (
        <img
          data-testid="plus-button"
          src={quantityplusactive}
          alt={quantityplusactive}
          className="quantityStepper"
          onClick={onPlusClick}
        ></img>
      )}
    </div>
  );
};

export default QuantityButton;
