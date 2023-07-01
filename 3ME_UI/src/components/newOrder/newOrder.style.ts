import { InputBase, Paper } from "@mui/material";
import { styled } from "@mui/system";

export const RootDiv = styled("div")(({ theme }) => ({
  textAlign: "left",
  width: "65.56%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const H1 = styled("h1")({
  margin: 0,
  paddingTop: "28px",
  display: "inline-block",
  fontSize: "18px",
  lineHeight: "22px",
});

export const P = styled("p")({
  margin: 0,
  fontSize: "14px",
  lineHeight: "18px",
});

export const PatientInput = styled(InputBase)({
  width: "100%",
});

export const Item = styled(Paper)(({ theme }) => ({
  padding: "4px",
  textAlign: "left",
  backgroundColor: "unset",
  border: 0,
  boxShadow: "none",
}));
