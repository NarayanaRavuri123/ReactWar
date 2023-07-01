import { FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import "./deviceInfo.css";
export const DeviceInfo = () => {
  return (
    <Grid container className="device-info-container">
      <div className="device-info-header">Device Information</div>
      <Grid item>
        <InputWithLabel
          label="Did the 3M device potentially cause or contribute to an injury?"
          isRequired={true}
          error={false}
        >
          <RadioGroup
            name="causeOfInjury"
            classes={{ root: "radioRoot" }}
            onChange={() => {}}
          >
            <FormControlLabel
              classes={{ root: "optionRoot" }}
              componentsProps={{
                typography: { classes: { root: "optiontxt" } },
              }}
              value="Yes"
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              classes={{ root: "optionRoot" }}
              componentsProps={{
                typography: { classes: { root: "optiontxt" } },
              }}
              value="No"
              control={<Radio />}
              label="No"
            />
            <FormControlLabel
              classes={{ root: "optionRoot" }}
              componentsProps={{
                typography: { classes: { root: "optiontxt" } },
              }}
              value="Unknown"
              control={<Radio />}
              label="Unknown"
            />
          </RadioGroup>
        </InputWithLabel>
      </Grid>
    </Grid>
  );
};
