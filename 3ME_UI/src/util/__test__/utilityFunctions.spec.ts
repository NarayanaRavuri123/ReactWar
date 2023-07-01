import { cleanup } from "@testing-library/react";
import { getAlertBgAndLabelColor } from "../utilityFunctions";
import {
  MISRXBGCOLOR,
  MISRXCOLOR,
  MSDUEBGCOLOR,
  MSDUECOLOR,
  MSDUELOWBGCOLOR,
  MSDUELOWCOLOR,
  MSDUEMEDBGCOLOR,
  MSDUEMEDCOLOR,
  PNDSOBGCOLOR,
  PNDSOCOLOR,
  SUPDEBGCOLOR,
  SUPDECOLOR,
  MSDOCBGCOLOR,
  MSDOCCOLOR,
  SHODRBGCOLOR,
  SHODRCOLOR,
  PODELBGCOLOR,
  PODELCOLOR,
  CONPLBGCOLOR,
  CONPLCOLOR,
} from "../../constants/staticText";
import {
  IAlertTypes,
  ISeverityTypes,
} from "../../components/myPatients/patient.interface";

describe("alert button component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("checks correct colors for alerts are returned", () => {
    expect(getAlertBgAndLabelColor(IAlertTypes.MISRX, null)).toEqual([
      MISRXBGCOLOR,
      MISRXCOLOR,
    ]);
    expect(
      getAlertBgAndLabelColor(IAlertTypes.MSDUE, ISeverityTypes.LOW)
    ).toEqual([MSDUELOWBGCOLOR, MSDUELOWCOLOR]);
    expect(
      getAlertBgAndLabelColor(IAlertTypes.MSDUE, ISeverityTypes.HIGH)
    ).toEqual([MSDUEBGCOLOR, MSDUECOLOR]);
    expect(
      getAlertBgAndLabelColor(IAlertTypes.MSDUE, ISeverityTypes.MEDIUM)
    ).toEqual([MSDUEMEDBGCOLOR, MSDUEMEDCOLOR]);
    expect(getAlertBgAndLabelColor(IAlertTypes.PNDSO, null)).toEqual([
      PNDSOBGCOLOR,
      PNDSOCOLOR,
    ]);
    expect(getAlertBgAndLabelColor(IAlertTypes.SUPDE, null)).toEqual([
      SUPDEBGCOLOR,
      SUPDECOLOR,
    ]);
    expect(getAlertBgAndLabelColor(IAlertTypes.MSDOC, null)).toEqual([
      MSDOCBGCOLOR,
      MSDOCCOLOR,
    ]);
    expect(getAlertBgAndLabelColor(IAlertTypes.SHODR, null)).toEqual([
      SHODRBGCOLOR,
      SHODRCOLOR,
    ]);
    expect(getAlertBgAndLabelColor(IAlertTypes.PODEL, null)).toEqual([
      PODELBGCOLOR,
      PODELCOLOR,
    ]);
    expect(getAlertBgAndLabelColor(IAlertTypes.CONPL, null)).toEqual([
      CONPLBGCOLOR,
      CONPLCOLOR,
    ]);
  });
});
