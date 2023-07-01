import { styled } from "@mui/system";

export const PageDiv = styled("div")({
  backgroundColor: "#f8f8fa",
  minHeight: "calc(100vh - 144px)",
  width: "100%",
  "&::after": {
    display: "table",
    content: "close-quote",
    clear: "both",
  },
});

export const SubPageDiv = styled("div")(({ theme }) => ({
  backgroundColor: "#f8f8fa",
  flex: "1",
  width: "85%",
  boxSizing: "border-box",
  float: "left",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: 0,
  },
}));

export const MainPage = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "calc(100vh - 144px)",
  justifyContent: "space-between",
  borderTop: "0.5px solid #CCCCD0",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

export const RouteSection = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100% !important",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));
