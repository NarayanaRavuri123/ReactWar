import { createContext } from "react";
import { ISalesRep, ITechnicalSupport } from "../needHelp/needHelp.interface";

interface IPageContextContext {
  salesRepContacts: ISalesRep | null;
  techRepContacts: ITechnicalSupport | null;
}

export const PageContext = createContext<IPageContextContext>({
  salesRepContacts: null,
  techRepContacts: null,
});
