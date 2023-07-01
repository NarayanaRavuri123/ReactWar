// Mui imports
import Button from "@mui/material/Button";
import { MouseEventHandler } from "react";
// css import
import "./primaryButton.css";

interface ButtonProps {
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
const PrimaryButton = (props: ButtonProps) => {
  const { title, onClick } = props;
  return (
    <Button
      variant="contained"
      className="primaryButton"
      classes={{ root: "btnRoot" }}
      onClick={onClick}
      disableRipple
      disableFocusRipple
      disableTouchRipple
    >
      {title}
    </Button>
  );
};

export default PrimaryButton;
