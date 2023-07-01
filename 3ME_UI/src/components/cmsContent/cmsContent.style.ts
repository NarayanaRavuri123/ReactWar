import { styled } from "@mui/system";
import { Card, Box, Button } from "@mui/material";

export const CardStyle = styled(Card)({
  padding: "16px",
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
  margin: "16px",
});

export const BoxStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "34px 187px",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "-41px",
  [theme.breakpoints.down(926)]: {
    padding: "34px 77px",
  },
  [theme.breakpoints.down(600)]: {
    padding: "0px",
  },
}));

export const ParaStyle = styled("p")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "18px",
  [theme.breakpoints.down(600)]: {
    width: "100%",
  },
}));

export const PerButtonStyle = styled(Button)(({ theme }) => ({
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "14px",
  lineHeight: "18px",
  textAlign: "center",
  textDecorationLine: "underline",
  color: "#0049BD",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "8px 14px 8px 10px",
  marginLeft: "177px",
  textTransform: "none",
  [theme.breakpoints.down(926)]: {
    padding: "0px",
    marginLeft: "80px",
  },
  [theme.breakpoints.down(600)]: {
    padding: "0px",
    marginLeft: "0px",
  },
}));

export const TopDivStyle = styled("div")({
  marginTop: "34px",
});

export const BottomDivStyle = styled("div")({
  marginBottom: "34px",
});
