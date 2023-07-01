import { Grid, IconButton } from "@mui/material";
import {
  CustomDropDown,
  DropDownValue,
} from "../customDropdown/customDropdown.component";
import { InputWithLabel } from "../inputWithLabel/inputWithLabel.component";
import { ReactComponent as CloseIcon } from "../../assets/popupcloseicon.svg";

type Props = {
  closeBtnClassName: string;
  closeHandler: any;
  customDropdownKey?: string;
  dropdownClassName: string;
  dropdownInputClassName: string;
  dropDownMenuObj?: Array<DropDownValue>;
  dropdownSelectPropClassName: string;
  error: boolean;
  handleChange: any;
  hasBothCodeValue?: boolean;
  inputTitle: string;
  inputTitleClassName: string;
  inputLabelKey?: string;
  name: string;
  placeHolder?: string;
  requiredInput?: boolean;
  testId: string;
  value: any;
};

export const CustomRemovableDropDown = ({
  closeBtnClassName,
  closeHandler,
  customDropdownKey = "",
  dropdownClassName,
  dropdownInputClassName,
  dropDownMenuObj,
  dropdownSelectPropClassName,
  error,
  handleChange,
  hasBothCodeValue = true,
  inputTitle,
  inputTitleClassName,
  inputLabelKey = "",
  name,
  placeHolder,
  requiredInput,
  testId,
  value,
}: Props) => {
  return (
    <div className={dropdownClassName}>
      <Grid container>
        <Grid item xs={11}>
          <InputWithLabel
            error={error}
            isRequired={requiredInput}
            key={inputLabelKey}
            label={inputTitle}
            labelClassName={inputTitleClassName}
            testId={testId}
          >
            <CustomDropDown
              handleChange={handleChange}
              dropDownMenuObj={dropDownMenuObj}
              hasBothCodeValue={hasBothCodeValue}
              key={customDropdownKey}
              name={name}
              placeHolder={placeHolder}
              selectpropsClassName={
                value ? dropdownSelectPropClassName : "placeHolder"
              }
              selectClassName={value ? dropdownInputClassName : "placeHolder"}
              testId={`${testId}-value`}
              value={value}
            />
          </InputWithLabel>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            aria-label="close"
            className={closeBtnClassName}
            data-testid={`${testId}-testId`}
            onClick={closeHandler}
            sx={{ padding: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};
