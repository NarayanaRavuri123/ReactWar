import "./patientInformation.css";
import { Popup } from "../../../core/popup/popup.component";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import { IValidateUPSAddressInfo } from "./patientInformation.interface";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { ReactComponent as RadioButtonIcon } from "../../../assets/radioButton.svg";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../assets/selectedRadioButton.svg";

export const ValidateUPSAddressInfo = ({
  address,
  openAddress,
  setOpenAddress,
  loading,
  setSelectedUPSAddress,
  selectedUPSAddress,
  validateAddress,
  handleAddressConitnueButton,
  noAddressFound,
  message,
  title,
}: IValidateUPSAddressInfo) => {
  const spinner = () => {
    return (
      <div className="login-loader">
        <LoadingSpinner />
      </div>
    );
  };

  const addresswidget = () => {
    return (
      <div className="validateAddressMainContainer">
        <div className="validateAddressHeader"> {title}</div>
        <p className="validateAddressSameAsEntered"> Use address as entered </p>
        {address && (
          <RadioGroup
            className="addressInfo"
            classes={{ root: "addressInfoRadioRoot" }}
            onChange={(e) => {
              setSelectedUPSAddress(e.target.value);
            }}
            value={selectedUPSAddress}
          >
            <>
              <FormControlLabel
                control={
                  <Radio
                    icon={<RadioButtonIcon />}
                    checkedIcon={<SelectedRadioButtonIcon />}
                    classes={{ root: "radioRoot" }}
                  />
                }
                data-testid="prod-information-yes"
                label={
                  <div>
                    <p className="addressInfoOptiontxt">
                      {address.address1} <br />
                      {address.address2 !== "" &&
                        address.address2 !== null &&
                        address.address2}
                      {address.address2 !== "" && address.address2 !== null && (
                        <br />
                      )}
                      {address.city} , {address.state} {address.zip}
                    </p>
                  </div>
                }
                value={
                  "enteredAddress-" +
                  JSON.stringify({
                    addressLine1: address.address1,
                    addressLine2: address.address2,
                    city: address.city,
                    state: address.state,
                    zipCode: address.zip,
                  })
                }
              />
              <p className="validateAddressFound"> Address we Found </p>
              {noAddressFound ? (
                <p className="novalidateAddressFound">{message}</p>
              ) : (
                <>
                  {validateAddress?.map(
                    (x: {
                      addressLine1: string | undefined;
                      addressLine2: string | undefined;
                      city: string | undefined;
                      state: string | undefined;
                      zipCode: string | undefined;
                    }) => (
                      <FormControlLabel
                        control={
                          <Radio
                            icon={<RadioButtonIcon />}
                            checkedIcon={<SelectedRadioButtonIcon />}
                            classes={{ root: "radioRoot" }}
                          />
                        }
                        data-testid="prod-information-yes"
                        label={
                          <div>
                            <p className="addressInfoOptiontxt">
                              {x.addressLine1} <br />
                              {x.addressLine2 !== null && address.address2}
                              {x.addressLine2 !== null && <br />}
                              {x.city} , {x.state} {x.zipCode}
                            </p>
                          </div>
                        }
                        value={
                          JSON.stringify({
                            addressLine1: x.addressLine1,
                            addressLine2: x.addressLine2,
                            city: x.city,
                            state: x.state,
                            zipCode: x.zipCode,
                          }) || ""
                        }
                      />
                    )
                  )}
                </>
              )}
            </>
          </RadioGroup>
        )}
        <div className="buttonGroup">
          <ExpressButton
            variant="outlined"
            parentClass="returnOrderEntryBtn"
            clickHandler={() => {
              setOpenAddress(false);
            }}
          >
            Return to Order Entry
          </ExpressButton>
          <ExpressButton
            variant="contained"
            parentClass="continueBtn"
            clickHandler={handleAddressConitnueButton}
          >
            Continue
          </ExpressButton>
        </div>
      </div>
    );
  };

  return (
    <Popup
      dialogParentClass="addressValidationPopup"
      openFlag={openAddress}
      closeHandler={() => setOpenAddress(false)}
    >
      <>{loading ? spinner() : addresswidget()}</>
    </Popup>
  );
};
