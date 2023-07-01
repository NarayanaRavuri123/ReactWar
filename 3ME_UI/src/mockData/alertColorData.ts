import {
  IAlertTypes,
  ISeverityTypes,
} from "../components/myPatients/patient.interface";
import {
  CONPLBGCOLOR,
  CONPLCOLOR,
  DISPENBGCOLOR,
  DISPENCOLOR,
  MISRXBGCOLOR,
  MISRXCOLOR,
  MSDOCBGCOLOR,
  MSDOCCOLOR,
  MSDUEBGCOLOR,
  MSDUECOLOR,
  MSDUELOWBGCOLOR,
  MSDUELOWCOLOR,
  MSDUEMEDBGCOLOR,
  MSDUEMEDCOLOR,
  PNDSOBGCOLOR,
  PNDSOCOLOR,
  PODELBGCOLOR,
  PODELCOLOR,
  SHODRBGCOLOR,
  SHODRCOLOR,
  SUPDEBGCOLOR,
  SUPDECOLOR,
} from "../constants/staticText";

export interface IAlertColours {
  backgroundColour: string;
  foreColour: string;
}
export type AlertColourConfigBySeverity = Record<ISeverityTypes, IAlertColours>; // lookup of severity -> colours
type AlertColourDefaultOrBySeverity =
  | IAlertColours
  | AlertColourConfigBySeverity;

interface IAlertDisplayConfig {
  alertType: IAlertTypes;
  hasSeverity: boolean;
  colours: AlertColourDefaultOrBySeverity;
}

export const alertColorsData: IAlertDisplayConfig[] = [
  {
    alertType: IAlertTypes.MISRX,
    hasSeverity: false,
    colours: {
      backgroundColour: MISRXBGCOLOR,
      foreColour: MISRXCOLOR,
    },
  },
  {
    alertType: IAlertTypes.MSDUE,
    hasSeverity: true,
    colours: {
      [ISeverityTypes.LOW]: {
        backgroundColour: MSDUELOWBGCOLOR,
        foreColour: MSDUELOWCOLOR,
      },
      [ISeverityTypes.HIGH]: {
        backgroundColour: MSDUEBGCOLOR,
        foreColour: MSDUECOLOR,
      },
      [ISeverityTypes.MEDIUM]: {
        backgroundColour: MSDUEMEDBGCOLOR,
        foreColour: MSDUEMEDCOLOR,
      },
    },
  },
  {
    alertType: IAlertTypes.PNDSO,
    hasSeverity: false,
    colours: {
      backgroundColour: PNDSOBGCOLOR,
      foreColour: PNDSOCOLOR,
    },
  },
  {
    alertType: IAlertTypes.SUPDE,
    hasSeverity: false,
    colours: {
      backgroundColour: SUPDEBGCOLOR,
      foreColour: SUPDECOLOR,
    },
  },
  {
    alertType: IAlertTypes.MSDOC,
    hasSeverity: false,
    colours: {
      backgroundColour: MSDOCBGCOLOR,
      foreColour: MSDOCCOLOR,
    },
  },
  {
    alertType: IAlertTypes.SHODR,
    hasSeverity: false,
    colours: {
      backgroundColour: SHODRBGCOLOR,
      foreColour: SHODRCOLOR,
    },
  },
  {
    alertType: IAlertTypes.PODEL,
    hasSeverity: false,
    colours: {
      backgroundColour: PODELBGCOLOR,
      foreColour: PODELCOLOR,
    },
  },
  {
    alertType: IAlertTypes.CONPL,
    hasSeverity: false,
    colours: {
      backgroundColour: CONPLBGCOLOR,
      foreColour: CONPLCOLOR,
    },
  },
  {
    alertType: IAlertTypes.DISPEN,
    hasSeverity: false,
    colours: {
      backgroundColour: DISPENBGCOLOR,
      foreColour: DISPENCOLOR,
    },
  },
];
