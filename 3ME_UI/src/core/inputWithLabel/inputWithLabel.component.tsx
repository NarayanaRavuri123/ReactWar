import { FormControl } from "@mui/material";
import { IInputWithLabel } from "./inputWithLabel.interface";
import {
  AsteriskSpan,
  BootstrapInput,
  StyledLabel,
} from "./inputWithLabel.style";

export const InputWithLabel = ({
  label,
  isRequired,
  children,
  sx,
  error,
  labelClassName,
  testId,
  errorMessage,
  showLabel = true,
}: IInputWithLabel) => {
  const requiredAsterisk = isRequired ? <AsteriskSpan>*</AsteriskSpan> : null;
  return (
    <FormControl
      variant="standard"
      sx={Object.assign({}, { width: "100%" }, sx)}
      error={error}
      data-testid={"formControl-" + testId}
    >
      {showLabel && (
        <StyledLabel
          shrink={true}
          margin={"dense"}
          className={labelClassName}
          data-testid={testId}
        >
          {label}
          {requiredAsterisk}
        </StyledLabel>
      )}
      <BootstrapInput>{children}</BootstrapInput>
      {errorMessage && (
        <span
          style={{
            color: "#d32f2f",
            fontSize: "12px",
            lineHeight: "14px",
            marginTop: "5px",
          }}
        >
          {errorMessage}
        </span>
      )}
    </FormControl>
  );
};
