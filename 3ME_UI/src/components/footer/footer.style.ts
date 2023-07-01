import { styled } from "@mui/system";
import { Toolbar, Box } from "@mui/material";

interface FooterStyleProps {
  sticky: boolean;
}

export const AppBarStyle = styled("footer", {
  shouldForwardProp: (prop) => prop !== "sticky",
})<FooterStyleProps>(({ theme, sticky }) => ({
  marginBottom: sticky ? "72px" : "0px",
  position: "static",
  backgroundColor: "#FFFFFF",
  boxShadow: "0px -1px 2px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    marginBottom: sticky ? "165px" : "0px",
  },
}));

export const ToolBarStyle = styled(Toolbar)({
  width: "100%",
  padding: "0",
  minHeight: "88px !important",
});

export const BoxMainContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  flexWrap: "wrap",
  [theme.breakpoints.down("sm")]: {
    padding: "24px",
  },
}));

export const BoxLeftContainer = styled(Box)(({ theme }) => ({
  float: "left",
  width: "60%",
  display: "block",
  fontSize: "80%",
  fontStyle: "normal",
  alignItems: "center",
  fontWeight: "normal",
  lineHeight: "180%",
  flexDirection: "row",
  justifyContent: "flex-start",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    float: "none",
  },
}));
export const BoxRightContainer = styled(Box)(({ theme }) => ({
  float: "right",
  width: "40%",
  display: "flex",
  fontSize: "80%",
  fontStyle: "normal",
  alignItems: "center",
  fontWeight: "normal",
  lineHeight: "180%",
  flexDirection: "row",
  justifyContent: "flex-end",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "flex-start",
    float: "none",
  },
}));

export const BoxLeftTextStyle = styled(Box)(({ theme }) => ({
  padding: "8px 0",
  [theme.breakpoints.down("sm")]: {
    display: "inline-block",
    padding: 0,
  },
}));
export const CopyRightParaGraph = styled("p")(({ theme }) => ({
  display: "ïnline",
  color: "#76767A",
  marginLeft: "15px",
  marginTop: 0,
  [theme.breakpoints.down("sm")]: {
    margin: "5px 0 15px 0",
  },
}));

export const BoxVertical = styled(Box)({
  backgroundColor: "#E4E4E8",
  display: "inline-block",
  width: "1px",
  height: "11px",
  border: "1px",
  alignSelf: "center",
  margin: "0 8px",
});

export const LinksBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  marginRight: "25px",
  [theme.breakpoints.down("sm")]: {
    marginRight: 0,
    display: "block",
    padding: 0,
  },
}));

export const BoxWhiteLinks = styled("a")({
  padding: "10px",
  display: "inline",
  borderBottom: "1px",
  height: "20px",
  "@media(max-width: 1125px)": {
    padding: "0px",
  },
  color: "#323234",
  fontSize: "12px",
  fontWeight: "700",
  lineHeight: "16px",
});

export const ImgWhiteLink = styled("img")(({ theme }) => ({
  float: "right",
  width: "20px",
  display: "inline",
  padding: "10px 0px 10px 10px",
  [theme.breakpoints.down("sm")]: {
    float: "none",
    padding: 0,
  },
}));

export const MainDiv = styled(Box)({
  width: "100%",
  position: "absolute",
});

export const SocialLink = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    float: "none",
    display: "inline-block",
    padding: "0 15px",
    ":first-of-type": {
      paddingLeft: 0,
    },
    ":last-of-type": {
      paddingRight: 0,
    },
  },
}));

export const SocialAnchor = styled("a")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "inline-block",
  },
}));
