import { FormControlLabel, Radio } from "@mui/material";
import { ReactComponent as RadioButtonIcon } from "../../assets/radioButton.svg";
import { ReactComponent as SelectedRadioButtonIcon } from "../../assets/selectedRadioButton.svg";
import "./customRadio.css";

export type RadioProps = {
  label: string;
  textValue: string;
  selectedValue: string;
};
export const CustomRadioButton = ({
  label,
  textValue,
  selectedValue,
}: RadioProps) => {
  return (
    <FormControlLabel
      classes={{
        root:
          selectedValue === textValue
            ? "radio-question-active"
            : "radio-question-root",
      }}
      componentsProps={{
        typography: {
          classes: {
            root:
              selectedValue === textValue
                ? "radion-question-select"
                : "radio-question-txt",
          },
        },
      }}
      control={
        <Radio
          icon={<RadioButtonIcon />}
          checkedIcon={<SelectedRadioButtonIcon />}
        />
      }
      label={label}
      value={textValue}
    />
  );
};
