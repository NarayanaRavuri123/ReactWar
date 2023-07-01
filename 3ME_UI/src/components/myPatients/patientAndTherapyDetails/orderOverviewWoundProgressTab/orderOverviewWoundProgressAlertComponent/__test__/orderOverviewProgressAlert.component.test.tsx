import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WoundProgressAlert from "../orderOverviewWoundProgressAlert.component";
import { PatientData } from "../../../../PatientData";
import { patientMockData } from "../../../../../../mockData/patientFound";
import React from "react";

describe("Wound Progress Alert component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Wound Progress Alert header", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <WoundProgressAlert
          selectedPatientData={patientMockData}
          alertsForRO={patientMockData}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("assessment-due-heading");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Assessment DueAssessment is due between");
  });
  it("Wound Progress Alert text  ", () => {
    render(
      <MemoryRouter>
        <WoundProgressAlert
          selectedPatientData={patientMockData}
          alertsForRO={patientMockData}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("assessment-due-text");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Assessment is due between");
  });
  it("Wound Progress Assessment button", () => {
    render(
      <MemoryRouter>
        <WoundProgressAlert
          selectedPatientData={patientMockData}
          alertsForRO={patientMockData}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("assessment-due-button");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Add Assessment");
    expect(title).not.toBeDisabled();
  });
});
