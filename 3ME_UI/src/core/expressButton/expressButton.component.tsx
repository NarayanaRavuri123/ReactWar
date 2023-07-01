import { Button } from "@mui/material";
import { IExpressBtn } from "./expressButton.interface";

export const ExpressButton = ({
  children,
  variant = "contained",
  clickHandler,
  parentClass = "",
  disabled,
  testId,
  startIcon,
  id,
}: IExpressBtn) => {
  return (
    <Button
      classes={{ root: parentClass }}
      onClick={clickHandler}
      variant={variant}
      disabled={disabled}
      sx={{
        backgroundColor: variant === "contained" ? "#0049BD" : "#fff",
        borderColor: variant === "outlined" ? "#0049BD" : "#fff",
        color: variant === "outlined" ? "#0049BD" : "#fff",
        borderRadius: "2px",
        textTransform: "capitalize",
        fontSize: "14px",
        lineHeight: "18px",
        paddingTop: variant === "outlined" ? "10px" : "11px",
        paddingBottom: variant === "outlined" ? "10px" : "11px",
        fontWeight: 700,
      }}
      className={
        variant === "contained"
          ? "containedBtn"
          : variant === "outlined"
          ? "outlinedBtn"
          : "textBtn"
      }
      data-testid={testId}
      startIcon={startIcon}
      id={id}
    >
      {children}
    </Button>
  );
};
