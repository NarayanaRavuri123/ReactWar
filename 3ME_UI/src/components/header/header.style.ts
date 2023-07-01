import { styled } from '@mui/system';

export const RootHeader = styled('header')({
  margin: '15px',
  '&::after': {
    display: 'table',
    content: 'close-quote',
    clear: 'both'
  }
});

export const TitleH1 = styled('h1')({
  float: 'left',
  fontSize: '18px',
  margin: 0
});

export const RightDiv = styled('div')({
  float: 'right'
});

export const HelpSpan = styled('span')({
  display: 'inline-block',
  fontSize: '14px',
  marginRight: '30px'
});