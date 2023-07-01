import { styled } from "@mui/material/styles";
import { Button, CardContent, Typography } from "@mui/material";

export const HelpAndSupportDiv = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  margin: "16px",
  [theme.breakpoints.down(800)]: {
    flexDirection: "column",
    margin: "0px",
  },
}));

export const HelpAndSupportSubDiv = styled("div")(({ theme }) => ({
  background: "#fff",
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  display: "flex",
  justifyContent: "space-between",
  padding: "8px",
  width: "75%",
  marginBottom: "16px",
  [theme.breakpoints.down(800)]: {
    width: "100%",
    boxSizing: "border-box",
  },
}));

export const RightMenuDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  paddingLeft: "16px",
  paddingRight: "56px",
  width: "25%",
  [theme.breakpoints.down(800)]: {
    width: "100%",
    padding: 0,
    marginBottom: "5px",
  },
}));

export const StyledCardContent = styled(CardContent)({
  display: "flex",
  padding: "0px!important",
  width: "100%",
  flexDirection: "column",
});

export const HeaderDiv = styled("div")({
  alignContent: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "fit-content",
  width: "100%",
});

export const Header = styled(Typography)({
  align: "left",
  color: "#323234",
  display: "inline-flex",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "24px",
  lineHeight: "28px",
  padding: "16px",
  position: "relative",
});

export const OptionsDiv = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const OptionDiv = styled("div")(({ theme }) => ({
  border: "1px solid #0049BD",
  borderRadius: "4px",
  display: "flex",
  justifyContent: "space-between",
  margin: "8px",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    margin: 0,
    marginBottom: "15px",
  },
}));

export const TitleAndDescriptionDiv = styled("div")({
  alignContent: "center",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "8px",
  width: "100%",
});

export const Title = styled(Typography)({
  align: "left",
  color: "#0049BD",
  display: "inline-flex",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "18px",
  lineHeight: "22px",
  margin: "8px",
  position: "relative",
});

export const Description = styled(Typography)({
  align: "left",
  color: "#4C4C4F",
  display: "inline-flex",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "18px",
  margin: "8px",
  position: "relative",
});

export const AddButton = styled(Button)({
  align: "center",
  color: "#0049BD",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "14px",
  lineHeight: "16px",
  maxWidth: "300px",
  minWidth: "100px",
  textTransform: "capitalize",
});
