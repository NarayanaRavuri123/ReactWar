import { cleanup, fireEvent, render } from "@testing-library/react";
import { PageSection } from "../../addPatientContainer/addPatientContainer.enum";
import { PatientNotFound } from "../patientNotFound.component";

describe("Patient Not Found component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("header text to be visible", () => {
    const spyFn = jest.fn();
    render(<PatientNotFound redirectHandler={spyFn} />);
    const val = document.querySelector(".header");
    expect(val?.textContent).toBe("Patient Not Found");
  });
  it("sub header text to be visible", () => {
    const spyFn = jest.fn();
    render(<PatientNotFound redirectHandler={spyFn} />);
    const val = document.querySelector(".not-found-msg");
    expect(val?.textContent).toContain("We were unable to locate a patient matching the search criteria provided.");
  });
  it("on click of search again, redirectHandler should be called", () => {
    const spyFn = jest.fn();
    render(<PatientNotFound redirectHandler={spyFn} />);
    fireEvent.click(document.querySelector(".search-again")!);
    expect(spyFn).toHaveBeenCalledWith(PageSection.SEARCH_FORM);
  });
});
