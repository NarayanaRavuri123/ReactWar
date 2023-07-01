import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SuppliesDelivered } from "../suppliesDelivered.component";

describe("SuppliesDelivered component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("SuppliesDelivered Header is there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SuppliesDelivered />
      </MemoryRouter>
    );
    const header = screen.getByTestId(
      "supplies-delivered-header-title"
    ).textContent;
    expect(header).toBe("Supplies Delivered");
  });

  it("SuppliesDelivered Body elements with current date are there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SuppliesDelivered />
      </MemoryRouter>
    );
    const date = new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const bodyTitle = screen.getByTestId("alert-body-title").textContent;
    expect(bodyTitle).toBe(
      "Supplies were delivered for this order on " + date + "."
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

  it("SuppliesDelivered Body elements with valid date  are there on UI", () => {
    const date = new Date("2022-05-25");
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SuppliesDelivered date={date} />
      </MemoryRouter>
    );
    const bodyTitle = screen.getByTestId("alert-body-title").textContent;
    expect(bodyTitle).toBe(
      "Supplies were delivered for this order on 05/25/2022."
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

  it("SuppliesDelivered Body elements with invalid date are there on UI", () => {
    const date = new Date("2022-25-05");
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SuppliesDelivered date={date} />
      </MemoryRouter>
    );
    const bodyTitle = screen.getByTestId("alert-body-title").textContent;
    expect(bodyTitle).not.toBe(
      "Supplies were delivered for this order on 05/25/2022."
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

  it("SuppliesDelivered View Supply Order Button  is there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SuppliesDelivered />
      </MemoryRouter>
    );
    const supplyOrderButton = screen.getByTestId(
      "alert-footer-outlined-button"
    ).textContent;
    expect(supplyOrderButton).toBe("View Supply Order");
  });

  it("SuppliesDelivered View Supply Order Button Action", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SuppliesDelivered />
      </MemoryRouter>
    );
    const supplyOrderButton = screen.getByTestId(
      "alert-footer-outlined-button"
    );
    expect(supplyOrderButton).toHaveTextContent("View Supply Order");
    fireEvent.click(supplyOrderButton);
  });
});
