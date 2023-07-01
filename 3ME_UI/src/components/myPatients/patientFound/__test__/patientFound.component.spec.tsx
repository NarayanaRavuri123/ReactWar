import { cleanup, fireEvent, render } from "@testing-library/react";
import { PageSection } from "../../addPatientContainer/addPatientContainer.enum";
import { PatientFound } from "../patientFound.component";

describe("Patient Found component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("name should be visible", () => {
    const spyFn = jest.fn();
    render(
      <PatientFound
        redirectHandler={spyFn}
        patient={{
          dob: "3-11-1990",
          lastName: "test",
          firstName: "test",
          alerts: [],
          orderCreationDate: "",
          facilityName: "",
          roNumber: 0,
        }}
      />
    );
    const val = document.querySelector(".patient-found b");
    expect(val?.textContent).toBe("test, test");
  });
  it("dob should be visible", () => {
    const spyFn = jest.fn();
    render(
      <PatientFound
        redirectHandler={spyFn}
        patient={{
          dob: "3-11-1990",
          lastName: "test",
          firstName: "test",
          alerts: [],
          orderCreationDate: "",
          facilityName: "",
          roNumber: 0,
        }}
      />
    );
    const val = document.querySelector(".patient-found .sub-text");
    expect(val?.textContent).toBe("DOB: 11/03/1990");
  });
  it("on click of search again, redirectHandler should be called", () => {
    const spyFn = jest.fn();
    render(
      <PatientFound
        redirectHandler={spyFn}
        patient={{
          dob: "3-11-1990",
          lastName: "test",
          firstName: "test",
          alerts: [],
          orderCreationDate: "",
          facilityName: "",
          roNumber: 0,
        }}
      />
    );
    fireEvent.click(document.querySelector(".search-again")!);
    expect(spyFn).toHaveBeenCalledWith(PageSection.SEARCH_FORM);
  });
});
