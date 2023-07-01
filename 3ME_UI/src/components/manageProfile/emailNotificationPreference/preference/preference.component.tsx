import "./preference.css";
import { InputHTMLAttributes } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { IPreferenceInterface } from "./preference.interface";
import { ReactComponent as RadioButtonIcon } from "../../../../assets/radioButton.svg";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../../assets/selectedRadioButton.svg";

export const Preference = ({
  title,
  name,
  value,
  setPreferencesData,
}: IPreferenceInterface) => {
  const titleTestId = `preference-title-${name}`;
  const yesTestId = `preference-yes-for-${name}`;
  const noTestId = `preference-no-for-${name}`;
  return (
    <div className="preferece">
      <div className="preferece-component">
        <h5 className="title" data-testid={titleTestId}>
          {title}
        </h5>
        <RadioGroup
          classes={{ root: "preference-root" }}
          data-test
          onChange={setPreferencesData}
          name={name}
          value={value}
        >
          <FormControlLabel
            classes={{ root: "preference-root-label-yes" }}
            componentsProps={{
              typography: { classes: { root: "optiontxt" } },
            }}
            control={
              <Radio
                checkedIcon={<SelectedRadioButtonIcon />}
                icon={<RadioButtonIcon />}
                inputProps={
                  {
                    "data-testid": `${yesTestId}`,
                  } as InputHTMLAttributes<HTMLInputElement>
                }
              />
            }
            label="Yes"
            value="yes"
          />
          <FormControlLabel
            classes={{ root: "preference-root-label-no" }}
            componentsProps={{
              typography: { classes: { root: "optiontxt" } },
            }}
            control={
              <Radio
                checkedIcon={<SelectedRadioButtonIcon />}
                icon={<RadioButtonIcon />}
                inputProps={
                  {
                    "data-testid": `${noTestId}`,
                  } as InputHTMLAttributes<HTMLInputElement>
                }
              />
            }
            label="No"
            value="no"
          />
        </RadioGroup>
      </div>
    </div>
  );
};
