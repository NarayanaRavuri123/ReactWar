import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ConfirmPlacement } from "../confirmPlacement.component";

describe("ConfirmPlacement component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("ConfirmPlacement Header is there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ConfirmPlacement />
      </MemoryRouter>
    );
    const header = screen.getByTestId(
      "confirm-placement-header-title"
    ).textContent;
    expect(header).toBe("Confirm Placement");
  });

  it("ConfirmPlacement Body elmenets are there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ConfirmPlacement />
      </MemoryRouter>
    );
    const bodyTitle = screen.getByTestId("alert-body-title").textContent;
    expect(bodyTitle).toBe(
      "Proof of Home Delivery (POHD) needs to be confirmed for this Ready Care™ Unit"
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

  it("ConfirmPlacement Print Excessive Supply Form Button is there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ConfirmPlacement />
      </MemoryRouter>
    );
    const printButton = screen.getByTestId("alert-footer-outlined-button");
    expect(printButton).toHaveTextContent("Confirm Placement");
  });
});
