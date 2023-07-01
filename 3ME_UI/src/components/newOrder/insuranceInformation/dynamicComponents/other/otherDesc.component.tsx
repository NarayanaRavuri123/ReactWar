import { Grid, TextField } from "@mui/material";
import { InputWithLabel } from "../../../../../core/inputWithLabel/inputWithLabel.component";
import "./otherDesc.css";

export type OtherDescriptionProps = {
  onChange: Function;
  error: boolean;
  required: boolean;
  value: string;
  primary: boolean;
};

export const OtherDescription = ({
  onChange,
  error,
  required,
  value,
  primary,
}: OtherDescriptionProps) => {
  return (
    <Grid container className="other-detail-container">
      <InputWithLabel
        error={error}
        isRequired={required}
        label="Please provide additional detail"
        testId="insurance-additional-detail"
      >
        <TextField
          error={error}
          FormHelperTextProps={{ classes: { root: "helperText" } }}
          fullWidth
          InputProps={{
            classes: {
              root: "textarea-root",
            },
          }}
          multiline
          name="otherAdditionalDetails"
          onChange={(e: any) => onChange(e, primary)}
          required={required}
          rows={4}
          value={value}
        />
      </InputWithLabel>
    </Grid>
  );
};
