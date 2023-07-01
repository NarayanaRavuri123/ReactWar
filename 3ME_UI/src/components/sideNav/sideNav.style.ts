import { styled } from '@mui/system';
import { Link } from "react-router-dom";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export const NavigationBarDiv = styled('div')(({theme}) => ({
  width: '15%',
  backgroundColor: '#fff',
  float: 'left',
  boxSizing: 'border-box',
  fontWeight: '400',
  color: '#4C4C4F',
  fontSize: '16px',
  minHeight: 'calc(100vh - 140px)',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

export const OptionLink = styled(Link)(({theme}) => ({
  display: 'flex',
  padding: '20px 0',
  textDecoration: 'none',
  textSize: '16px',
  color: '#000',
  textAlign: 'left',
  marginLeft: '24px',
  fontWeight: '400',
  ':hover': {
    color: '#1E64D0',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px',
    height: 'unset',
    margin: 0
  }
}));

export const OptionLinkActive = styled(Link)(({theme}) => ({
  display: 'block',
  padding: '20px 0',
  textDecoration: 'none',
  color: '#0049BD',
  textAlign: 'left',
  borderRight: '6px solid #3D81E1',
  marginLeft: '24px',
  fontWeight: '700',
  fontSize: '16px',
  height: '23px',
  [theme.breakpoints.down('sm')]: {
    padding: '20px',
    height: 'unset',
    margin: 0
  }
}));

export const OptionLinkWrapper = styled('div')(({theme}) => ({
  borderBottom: '0.5px solid #CCCCD0',
  height: '62px',
  ':hover': {
    backgroundColor: '#E8F4FF',
  },
  [theme.breakpoints.down('sm')]: {
    height: 'unset'
  }
}));

export const StyledMenuOutlinedIcon = styled(MenuOutlinedIcon)({
  position: 'absolute',
  top: '15px',
  left: '10px'
});

export const CrossDiv = styled('div')({
  padding: '20px',
  borderBottom: '0.5px solid #CCCCD0'
});
