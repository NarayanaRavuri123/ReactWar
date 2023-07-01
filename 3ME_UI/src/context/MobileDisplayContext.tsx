import { useMediaQuery } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { WindowService } from "../util/window.service";

interface IMobileDisplayContext {
  isMobileScreen: boolean;
}

interface IMobileDisplayContextProviderProps {
  children: React.ReactNode;
  windowService?: WindowService;
}

export const MobileDisplayContext = createContext<IMobileDisplayContext>({
  isMobileScreen: false,
});

export const MobileDisplayContextProvider = ({
  children,
  windowService = new WindowService(),
}: IMobileDisplayContextProviderProps) => {
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(
    useMediaQuery("(max-width: 926px)")
  );
  useEffect(() => {
    windowService.resize(() => {
      if (windowService.getWidth() < 926) {
        setIsMobileScreen(true);
      } else {
        setIsMobileScreen(false);
      }
    });
  }, []);
  return (
    <MobileDisplayContext.Provider value={{ isMobileScreen: isMobileScreen }}>
      {children}
    </MobileDisplayContext.Provider>
  );
};
