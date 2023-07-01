import { useContext } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import { PatientOrdersDetails } from "../patientOrdersDetails.component";
import {
  MyPatientContext,
  MyPatientContextType,
} from "../../../../context/MyPatientContext";
import { getMockPatientOrderData } from "./patientOrderMockContextData";

describe("Patient Order and Details component ->", () => {
  afterAll(() => {
    cleanup();
  });
  enum MyPatientModalSection {
    LOAD_PATIENT = "loadpatient",
    PATIENT_LOCKED = "patientlock",
    PATIENT_SUBMITTED = "Submitted",
    PATIENT_SAVED = "Saved",
    PATIENT_EMPTY = "EMPTY",
  }
  it("Validate Spinner", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LoadingSpinner />
      </MemoryRouter>
    );
    const loaderText = screen.getByTestId("loading-text-large");
    expect(loaderText).toBeInTheDocument();
  });
  it("Validate popup exist or not", () => {
    render(
      <MyPatientContext.Provider
        value={{
          ...getMockPatientOrderData(),
        }}
      >
        <PatientOrdersDetails />
      </MyPatientContext.Provider>
    );
    const popupText = screen.getByTestId("popupCloseIcon");
    expect(popupText).toBeInTheDocument();
  });

  it("Validate submitted popup exist or not", () => {
    render(
      <MyPatientContext.Provider
        value={{
          ...getMockPatientOrderData(),
          myPatientClickModalSection: MyPatientModalSection.PATIENT_SUBMITTED,
        }}
      >
        <PatientOrdersDetails />
      </MyPatientContext.Provider>
    );
    const submitBtn = screen.getByTestId("patientSubmitted");
    expect(submitBtn).toBeInTheDocument();
  });
  it("Validate lock popup exist or not", () => {
    render(
      <MyPatientContext.Provider
        value={{
          ...getMockPatientOrderData(),
          myPatientClickModalSection: MyPatientModalSection.PATIENT_LOCKED,
        }}
      >
        <PatientOrdersDetails />
      </MyPatientContext.Provider>
    );
    const lockBtn = screen.getByTestId("patienLocked");
    expect(lockBtn).toBeInTheDocument();
  });
  it("Validate empty popup exist or not", () => {
    render(
      <MyPatientContext.Provider
        value={{
          ...getMockPatientOrderData(),
          myPatientClickModalSection: MyPatientModalSection.PATIENT_EMPTY,
        }}
      >
        <PatientOrdersDetails />
      </MyPatientContext.Provider>
    );
    const emptyBtn = screen.getByTestId("patientEmpty");
    expect(emptyBtn).toBeInTheDocument();
  });
});
