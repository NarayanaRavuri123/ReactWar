import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { patientMockData } from "../../../../../mockData/patientFound";
import { CancelPatientOrder } from "../cancelPatientOrder.component";

describe("DeletePopup Popup component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Title of cancel patient order component present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CancelPatientOrder
          patient={patientMockData}
          isPatientCancelOrder={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("cancelPatientOrder-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Cancel Patient Order");
  });

  it("CancellationReason drop down label present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CancelPatientOrder
          patient={patientMockData}
          isPatientCancelOrder={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("cancellationReason-label-Test");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Reason for cancellation");
  });
  it("Back button text present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CancelPatientOrder
          patient={patientMockData}
          isPatientCancelOrder={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("backBtnTest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Back");
  });
  it("Cancel button text present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CancelPatientOrder
          patient={patientMockData}
          isPatientCancelOrder={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("cancelBtnTest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Cancel");
  });
});
