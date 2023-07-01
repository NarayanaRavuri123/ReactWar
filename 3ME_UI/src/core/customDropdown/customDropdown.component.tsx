import { MenuItem, Select } from "@mui/material";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { ReactComponent as SelectIcon } from "../../assets/Accinfo.svg";
import "./customDropdown.css";

type Props = {
  value: any; // dropdown selected value
  handleChange: any; // onchange function
  menuItem?: Array<string>; // dropdown list in array
  selectClassName?: string; // dropdown classname for style
  selectpropsClassName?: string; // dropdown input props style element classname
  testId?: string; // testid for easily trageting while writing unittestcases
  name?: string; //dropdown name element
  placeHolder?: string;
  dropDownMenuObj?: Array<DropDownValue>;
  hasBothCodeValue?: boolean;
  key?: string;
  disabled?: boolean;
  paperPropsClassName?: string;
};

export const CustomDropDown = ({
  value,
  handleChange,
  menuItem,
  selectClassName,
  selectpropsClassName,
  testId,
  name,
  placeHolder,
  dropDownMenuObj,
  hasBothCodeValue,
  key,
  disabled = false,
  paperPropsClassName = "paperpropsClass",
}: Props) => {
  return (
    <Select
      name={name}
      variant="outlined"
      value={value}
      onChange={handleChange}
      classes={{
        select: selectpropsClassName,
      }}
      className={selectClassName}
      IconComponent={SelectIcon}
      data-testid={testId}
      MenuProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },

        PaperProps: {
          className: paperPropsClassName,
        },
      }}
      displayEmpty={true}
      renderValue={(value) => (value?.length ? value : placeHolder)}
      key={key}
      disabled={disabled}
    >
      {menuItem &&
        !hasBothCodeValue &&
        Array.isArray(menuItem) &&
        menuItem.map((element, index): any => {
          return (
            <MenuItem value={element} key={index}>
              {element}
            </MenuItem>
          );
        })}
      {dropDownMenuObj &&
        hasBothCodeValue &&
        dropDownMenuObj.map((elementCode, index): any => {
          return (
            <MenuItem
              value={elementCode.text}
              key={index + "-" + elementCode.code}
            >
              <div>{elementCode.text}</div>
            </MenuItem>
          );
        })}
    </Select>
  );
};

export interface DropDownValue {
  code: string;
  text: string;
}
