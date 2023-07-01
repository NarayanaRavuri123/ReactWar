import {
  Box,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import "./woundBedToggleButton.css";

export const WoundBedToggleButton = ({
  groupValue,
  groupOnChange,
  buttonValue,
  label,
  imgLink,
}: any) => {
  return (
    <Grid container className="woundBed-GridMaincontainer">
      <Grid item>
        <img src={imgLink} alt={imgLink} width="64px" height="64px" />
      </Grid>
      <Grid item className="woundBedContainer">
        <InputWithLabel
          isRequired={false}
          label={label}
          labelClassName="bedLabel"
          sx={{ marginTop: "8px" }}
        >
          <Box>
            <ToggleButtonGroup
              value={groupValue}
              onChange={groupOnChange}
              exclusive
              size="small"
              aria-label="select group"
              color="primary"
              className="toggleBtnGroup"
            >
              {Array.isArray(buttonValue) &&
                buttonValue.map((row: any, idx: any) => (
                  <ToggleButton
                    key={idx}
                    value={row.code}
                    aria-label={row.code}
                    className="toggleButtonRoot"
                    data-testid={`${row.code}test`}
                  >
                    <Typography>{row.label}</Typography>
                  </ToggleButton>
                ))}
            </ToggleButtonGroup>
          </Box>
        </InputWithLabel>
      </Grid>
    </Grid>
  );
};
