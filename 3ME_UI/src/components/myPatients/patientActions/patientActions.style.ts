import { styled } from "@mui/system";
import { Link } from "react-router-dom";

export const PopperDiv = styled("div")({
  backgroundColor: "#FFFFFF",
  border: "1px groove #B4B4B8",
  borderRadius: "2px",
  boxSizing: "border-box",
  float: "left",
  width: "auto",
});

export const ActionsDiv = styled("div")({
  color: "#18181A",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "20px",
  padding: "16px",
  cursor: "pointer",
  textAlign: "left",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.05)",
  },
});

export const PatientActionLink = styled(Link)({
  color: "#18181A",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "20px",
  padding: "20px",
  textAlign: "left",
  textDecoration: "none",
});
