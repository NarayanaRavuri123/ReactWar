import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  alertMockData,
  patientMockData,
} from "../../../../../mockData/patientFound";
import OrderDetailAlertBanner from "../orderDetailsAlertBanner.component";

describe("Order Overview stepper component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Alert Banner header", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <OrderDetailAlertBanner
          alertData={alertMockData}
          patientData={patientMockData}
          alertsForRO={undefined}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("alertBanner-header");
    expect(header).toBeInTheDocument();

    expect(header).toHaveTextContent("Missing Rx");
  });
  it("Alert Banner sub-header", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <OrderDetailAlertBanner
          alertData={alertMockData}
          patientData={patientMockData}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("alertReason");
    expect(header).toBeInTheDocument();

    expect(header).toHaveTextContent(
      "A prescription has not been received and validated for this order."
    );
  });
  it("Alert action Button", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <OrderDetailAlertBanner
          alertData={alertMockData}
          patientData={patientMockData}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("alertAction-button");
    expect(header).toBeInTheDocument();

    expect(header).toHaveTextContent("Submit Prescription");
  });
});
