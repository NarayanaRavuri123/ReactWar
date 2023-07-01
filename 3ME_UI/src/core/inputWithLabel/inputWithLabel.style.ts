import { InputLabel } from "@mui/material";
import { styled } from "@mui/system";

export const AsteriskSpan = styled("span")(({ theme }) => ({
  color: "red",
  marginLeft: "3px",
}));

export const StyledLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: "12px",
  lineHeight: "14px",
  fontWeight: 400,
  color: "#323234",
  transform: "none",
  ".MuiFormControl-root &": {
    fontFamily: '"3MCircularTT"',
  },
}));

export const BootstrapInput = styled("div")(({ theme }) => ({
  "label + &": {
    marginTop: "20px",
  },
  "& .MuiInputBase-input": {
    borderRadius: 2,
    position: "relative",
    backgroundColor: "#fff",
    border: "1px solid #94949A",
    fontSize: 14,
    padding: "9px 12px",
  },
  "& .MuiFormControl-root": {
    width: "100%",
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "black",
  },
}));
