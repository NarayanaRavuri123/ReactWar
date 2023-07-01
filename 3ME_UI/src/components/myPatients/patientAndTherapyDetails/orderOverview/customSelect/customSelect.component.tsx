import { MenuItem, Select } from "@mui/material";
// import { ReactComponent as SelectIcon } from "../../assets/Chevron button.svg.svg";
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
};

export const CustomSelect = ({
  value,
  handleChange,
  menuItem,
  selectClassName,
  selectpropsClassName,
  testId,
  name,
  placeHolder,
  key,
  disabled = false,
}: Props) => {
  return (
    <Select
      sx={{
        "&:hover": {
          "&& fieldset": {
            border: "transparent",
          },
        },
      }}
      name={name}
      variant="outlined"
      value={value}
      onChange={handleChange}
      classes={{
        select: selectpropsClassName,
      }}
      className={selectClassName}
      data-testid={testId}
      inputProps={{ IconComponent: () => null }}
      MenuProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        PaperProps: {
          style: {
            margin: "auto",
            zIndex: "0",
            borderRadius: "2px",
            overflow: "auto",
          },
        },
      }}
      displayEmpty={true}
      renderValue={(value) => (value?.length ? value : placeHolder)}
      key={key}
      disabled={disabled}
    >
      {menuItem &&
        Array.isArray(menuItem) &&
        menuItem.map((element, index): any => {
          return (
            <MenuItem value={element} key={index}>
              {element}
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
