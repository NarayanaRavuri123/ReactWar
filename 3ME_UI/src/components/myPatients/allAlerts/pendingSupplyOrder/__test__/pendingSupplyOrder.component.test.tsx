import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PendingSupplyOrder } from "../pendingSupplyOrder.component";

describe("PendingSupplyOrder component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("PendingSupplyOrder Header is there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PendingSupplyOrder />
      </MemoryRouter>
    );
    const header = screen.getByTestId(
      "pending-supply-order-header-title"
    ).textContent;
    expect(header).toBe("Pending Supply Order");
  });

  it("PendingSupplyOrder Body elmenets are there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PendingSupplyOrder />
      </MemoryRouter>
    );
    const bodyTitle = screen.getByTestId("alert-body-title").textContent;
    expect(bodyTitle).toBe(
      "Supplies are outside of the anniversary time frame"
    );
    const description = screen.getByTestId(
      "alert-body-description"
    ).textContent;
    expect(description).toBe("For assistance, please call 3M at");
    const phoneNumber = screen.getByTestId(
      "alert-body-phone-value"
    ).textContent;
    expect(phoneNumber).toBe("(800) 275-4524");
  });

  it("PendingSupplyOrder Print Excessive Supply Form Button is there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PendingSupplyOrder />
      </MemoryRouter>
    );
    const printButton = screen.getByTestId("alert-footer-outlined-button");
    expect(printButton).toHaveTextContent("Print Excessive Supply Form");
  });

  it("PendingSupplyOrder Print Excessive Supply Form Button Action", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PendingSupplyOrder closePopUpAction={spyFn} />
      </MemoryRouter>
    );
    const printButton = screen.getByTestId("alert-footer-outlined-button");
    expect(printButton).toHaveTextContent("Print Excessive Supply Form");
    fireEvent.click(printButton);
    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toBeCalledTimes(1);
  });

  it("PendingSupplyOrder Print Excessive Supply Form Button Action multiple click", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PendingSupplyOrder closePopUpAction={spyFn} />
      </MemoryRouter>
    );
    const printButton = screen.getByTestId("alert-footer-outlined-button");
    expect(printButton).toHaveTextContent("Print Excessive Supply Form");
    fireEvent.click(printButton);
    fireEvent.click(printButton);
    fireEvent.click(printButton);
    fireEvent.click(printButton);
    fireEvent.click(printButton);
    fireEvent.click(printButton);
    fireEvent.click(printButton);
    expect(spyFn).toBeCalledTimes(7);
  });
});
