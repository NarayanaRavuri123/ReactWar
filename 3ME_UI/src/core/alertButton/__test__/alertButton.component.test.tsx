import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import AlertButton from "../alertButton.component";
import { patientListTestData } from "./alertButton.test.data";
import { MemoryRouter } from "react-router-dom";

describe("alert button component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("renders alert button component", () => {
    patientListTestData.forEach((patient) => {
      patient.alerts.forEach((alert) => {
        render(
          <MemoryRouter>
            <AlertButton alertData={alert} onClick={() => {}} />
          </MemoryRouter>
        );
        const dateID = `${alert.alertID}date`;
        const labelID = `${alert.alertID}label`;
        expect(screen.getByTestId(labelID)).toBeInTheDocument();
        expect(screen.getByTestId(dateID)).toBeInTheDocument();
      });
    });
  });
});
