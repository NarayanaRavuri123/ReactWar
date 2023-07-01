import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { ReactComponent as RadioButtonIcon } from "../../assets/radioButton.svg";
import { ReactComponent as SelectedRadioButtonIcon } from "../../assets/selectedRadioButton.svg";
import "./customRadio.css";

export type RadioProps = {
  name: string;
  labelYes: string;
  labelNo: string;
  dataTestIdYes: string;
  dataTestIdNo: string;
  value: any;
  handleChange: any;
  valueYes?: string;
  valueNo?: string;
};
export const RadioGroupButton = ({
  name,
  labelYes,
  labelNo,
  dataTestIdYes,
  dataTestIdNo,
  value,
  handleChange,
  valueYes = "yes",
  valueNo = "no",
}: RadioProps) => {
  return (
    <RadioGroup
      name={name}
      classes={{ root: "radioRoot" }}
      value={value}
      onChange={handleChange}
    >
      <FormControlLabel
        classes={{
          root: value === "yes" ? "optionRoot-active" : "optionRoot",
        }}
        componentsProps={{
          typography: {
            classes: {
              root: value === "yes" ? "optiontxtSelect" : "optiontxt",
            },
          },
        }}
        control={
          <Radio
            icon={<RadioButtonIcon />}
            checkedIcon={<SelectedRadioButtonIcon />}
          />
        }
        data-testid={dataTestIdYes}
        label={labelYes}
        value={valueYes}
      />
      <FormControlLabel
        classes={{
          root: value === "no" ? "optionRoot-active" : "optionRoot",
        }}
        componentsProps={{
          typography: {
            classes: {
              root: value === "no" ? "optiontxtSelect" : "optiontxt",
            },
          },
        }}
        control={
          <Radio
            icon={<RadioButtonIcon />}
            checkedIcon={<SelectedRadioButtonIcon />}
          />
        }
        data-testid={dataTestIdNo}
        label={labelNo}
        value={valueNo}
      />
    </RadioGroup>
  );
};
