import { styled } from '@mui/system';
import { FormControlLabel, RadioGroup } from "@mui/material";
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export const FormLabelOption = styled(FormControlLabel)({
  width: '100%',
  margin: 0
});

export const ParentDiv = styled('div')({
  display: 'inline-block',
  marginLeft: '15px'
});

export const ControlSpan = styled('span')({
  border: '1px solid #000',
  minWidth: '350px',
  padding: '5px',
  display: 'inline-block',
  position: 'relative'
});

export const DisplaySpan = styled('span')({
  position: 'absolute',
  top: '8px'
});

export const ExpandLessIcon = styled(ExpandLess)({
  float: 'right'
});

export const ExpandMoreIcon = styled(ExpandMore)({
  float: 'right'
});

export const RadioGroupOption = styled(RadioGroup)({
  backgroundColor: '#fff',
  zIndex: 1,
  minWidth: '350px',
  maxHeight: '0',
  overflow: 'hidden',
  position: 'absolute',
  transition: 'max-height 0.15s ease-out',
});

export const OpenedRadioGroupOption = styled(RadioGroup)({
  backgroundColor: '#fff',
  zIndex: 1,
  minWidth: '350px',
  overflow: 'hidden',
  position: 'absolute',
  transition: 'max-height 0.15s ease-in',
  maxHeight: '500px',
  border: '1px solid #000',
  padding: '5px',
});