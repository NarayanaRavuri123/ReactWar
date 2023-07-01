import { Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import { IExpressDrawer } from './drawer.interface';

export const ExpressDrawer = ({direction, children, openFlag}: IExpressDrawer) => {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setOpen(openFlag);
  }, [openFlag]);
  return (
    <Drawer anchor={direction} open={open}>
      {children}
    </Drawer>
  )
}