import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { patientMockData } from "../../../../../mockData/patientFound";
import { DischargePending } from "../dischargePending.component";

describe("Discharge Pending component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Discharge Pending Header is there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DischargePending patient={patientMockData} />
      </MemoryRouter>
    );
    const header = screen.getByTestId(
      "discharge-pending-header-title"
    ).textContent;
    expect(header).toBe("Discharge pending");
  });

  it("Discharge Pending Body elmenets are there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DischargePending patient={patientMockData} />
      </MemoryRouter>
    );
    const bodyTitle = screen.getByTestId("alert-body-title").textContent;
    expect(bodyTitle).toBe("Proceed to completing discharge order.");
  });

  it("Discharge Pending component Complete Discharge Button is there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DischargePending patient={patientMockData} />
      </MemoryRouter>
    );
    const printButton = screen.getByTestId("alert-footer-outlined-button");
    expect(printButton).toHaveTextContent("Complete Discharge");
  });

  it("Discharge Pending component Complete Discharge Button Action", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DischargePending completeDischarge={spyFn} patient={patientMockData} />
      </MemoryRouter>
    );
    const completeDischargeButton = screen.getByTestId(
      "alert-footer-outlined-button"
    );
    expect(completeDischargeButton).toHaveTextContent("Complete Discharge");
    fireEvent.click(completeDischargeButton);
    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toBeCalledTimes(1);
  });

  it("Discharge Pending component Complete Discharge Button Action multiple click", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DischargePending completeDischarge={spyFn} patient={patientMockData} />
      </MemoryRouter>
    );
    const completeDischargeButton = screen.getByTestId(
      "alert-footer-outlined-button"
    );
    expect(completeDischargeButton).toHaveTextContent("Complete Discharge");
    fireEvent.click(completeDischargeButton);
    expect(spyFn).toHaveBeenCalled();
    fireEvent.click(completeDischargeButton);
    fireEvent.click(completeDischargeButton);
    fireEvent.click(completeDischargeButton);
    fireEvent.click(completeDischargeButton);
    fireEvent.click(completeDischargeButton);
    fireEvent.click(completeDischargeButton);
    expect(spyFn).toBeCalledTimes(7);
  });
});
