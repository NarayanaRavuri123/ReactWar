import { styled } from "@mui/material/styles";
import {
  Button,
  CardContent,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

export const MyPatientsSubDiv = styled("div")(({ theme }) => ({
  background: "#fff",
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  display: "flex",
  justifyContent: "space-between",
  padding: "8px",
  width: "75%",
  margin: "16px 0px 16px 16px",
  [theme.breakpoints.down("sm")]: {
    display: "block",
    width: "auto",
    justifyContent: "unset",
    padding: 0,
  },
}));

export const RightMenuDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  paddingLeft: "16px",
  paddingRight: "56px",
  width: "25%",
  margin: "16px 0px 0px 0px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: 0,
  },
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
}));

export const OutlinedButtonDiv = styled("div")({
  background: "#fff",
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "8px",
});

export const MyPatientDiv = styled("div")(({ theme }) => ({
  alignContent: "center",
  display: "flex",
  flexDirection: "column",
  height: "72px",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    padding: "15px 15px 10px 15px",
  },
}));

export const Header = styled(Typography)({
  align: "left",
  color: "#323234",
  display: "inline-flex",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "20px",
  lineHeight: "24px",
  position: "relative",
});

export const SearchPatientDiv = styled("div")(({ theme }) => ({
  display: "flex",
  height: "32px",
}));

export const Search = styled("div")(({ theme }) => ({
  border: "1px groove #B4B4B8",
  borderRadius: "2px",
  background: "#fff",
  minWidth: "150px",
  marginLeft: "0px",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "auto",
    minWidth: "100px",
  },
  width: "100%",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(0.5, 1),
  pointerEvents: "none",
  position: "absolute",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#76767A",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      maxWidth: "auto",
      minWidth: "100px",
    },
  },
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  height: "100%",
  lineHeight: "18px",
  width: "100%",
}));

export const AddButton = styled(Button)(({ theme }) => ({
  align: "center",
  color: "#0049BD",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "14px",
  lineHeight: "16px",
  minWidth: "150px",
  textDecorationLine: "underline",
  textTransform: "capitalize",
  ":hover": {
    textDecorationLine: "underline",
  },
  [theme.breakpoints.down("sm")]: {
    paddingRight: 0,
    minWidth: "unset",
  },
}));

export const AddPhotos = styled(Button)(({ theme }) => ({
  align: "center",
  color: "#0049BD",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "14px",
  lineHeight: "0px",
  minWidth: "150px",
  textDecorationLine: "underline",
  textTransform: "capitalize",
  padding: "0px",
  ":hover": {
    textDecorationLine: "underline",
    color: "none",
  },
  [theme.breakpoints.down("sm")]: {
    paddingRight: 0,
    minWidth: "unset",
  },
}));

export const NeedHelpDiv = styled("div")(({ theme }) => ({
  marginTop: "16px",
  [theme.breakpoints.down("sm")]: {
    marginBottom: "16px",
  },
}));

export const CloseButton = styled(Button)({
  align: "right",
  color: "#0049BD",
  position: "absolute",
  right: 8,
  top: 8,
});

export const BorderButtonWithIcon = styled(Button)(({ theme }) => ({
  align: "center",
  border: "1px solid",
  borderColor: "#0049BD",
  borderRadius: "2px",
  color: "#0049BD",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "14px",
  lineHeight: "16px",
  margin: "8px",
  minHeight: "56px",
  minWidth: "100px",
  paddingLeft: `calc(1em + ${theme.spacing(1)})`,
  textTransform: "capitalize",
}));

export const PatientProfileCard = styled(Box)({
  padding: "16px 0px",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "auto",
});

export const PatientProfileLoader = styled(Box)({
  padding: "50px 0px 0px 0px",
  margin: "auto",
  display: "block",
  height: "100px",
  textAlign: "center",
  color: "#0049BD",
});

export const PatientProfileMessage = styled(Box)({
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  flexDirection: "column",
  height: "290px",
  textAlign: "center",
  verticleAlign: "middle",
});

export const PatientProfileRow = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  border: "1px solid #E4E4E8",
  [theme.breakpoints.up("sm")]: {
    width: "99%",
  },
  [theme.breakpoints.down("sm")]: {
    border: 0,
    borderBottom: "1px solid #E4E4E8",
    padding: "15px 15px 10px 15px",
  },
}));

export const PatientProfileColumn = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "16px 0px 16px 16px",
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
}));

export const PatientProfile = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    position: "relative",
  },
}));

export const PatientProfileTags = styled(Box)({
  gridColumn: "span 20",
});

export const PatientProfileDotMenu = styled(Box)(({ theme }) => ({
  display: "flex",
  float: "right",
  justifyContent: "right",
  height: "40px",
  marginTop: "-16px",
  marginLeft: "auto",
  [theme.breakpoints.down("sm")]: {
    position: "absolute",
    right: "10px",
    top: "-10px",
    height: "auto",
    marginTop: 0,
  },
}));

export const DotMenuIconButton = styled(IconButton)({
  borderRadius: "0px",
  display: "flex",
  justifyContent: "center",
});

export const PatientName = styled(Box)({
  lineHeight: "20px",
  fontWeight: "700",
  fontSize: "16px",
  color: "#323234",
  marginBottom: "4px",
});

export const PatientDataRowCol = styled(Box)({
  display: "flex",
});

export const PatientDataTitle = styled(Box)({
  lineHeight: "16px",
  fontSize: "12px",
  color: "#323234",
  width: "50px",
  minWidth: "50px",
});

export const PatientDataValue = styled(Box)({
  lineHeight: "16px",
  fontSize: "12px",
  color: "#4C4C4F",
});

export const CreatedDate = styled(Box)({
  lineHeight: "16px",
  fontWeight: "400",
  fontSize: "12px",
  marginTop: "4px",
  color: "#76767A",
});

export const PatientDataBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
  width: "35%",
  cursor: "pointer",
}));

export const HeaderDiv = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
