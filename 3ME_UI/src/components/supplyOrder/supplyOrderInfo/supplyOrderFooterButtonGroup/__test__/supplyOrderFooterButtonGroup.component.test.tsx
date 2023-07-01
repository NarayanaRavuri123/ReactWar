import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { SupplyOrderContext } from "../../../../../context/SupplyOrderContext";
import { SupplyOrderPageSection } from "../../../SupplyOrderPageSection.enum";
import { getMockSupplyOrderData } from "../../../__test__/supplyOrderMockContext.data";
import SupplyOrderFooterButtonGroup from "../supplyOrderFooterButtonGroup.component";

describe("Supply Order persistent footer ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate if supply order persistent footer delete order button present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SupplyOrderFooterButtonGroup
          handlePlaceOrder={() => {}}
        ></SupplyOrderFooterButtonGroup>
      </MemoryRouter>
    );
    const title = screen.getByTestId("deleteOrderClass");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Delete order");
  });
  it("Validate if supply order persistent footer review order button present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SupplyOrderFooterButtonGroup
          handlePlaceOrder={() => {}}
        ></SupplyOrderFooterButtonGroup>
      </MemoryRouter>
    );
    const title = screen.getByTestId("reviewOrderClass");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Review Order");
  });
  it("confirm back button click action", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SupplyOrderContext.Provider
          value={{
            ...getMockSupplyOrderData(),
            supplyOrderPage: SupplyOrderPageSection.SUPPLYORDER_REVIEW,
          }}
        >
          <SupplyOrderFooterButtonGroup handlePlaceOrder={() => {}} />
        </SupplyOrderContext.Provider>
      </MemoryRouter>
    );
    const backbtn = screen.queryByText("Back");
    expect(backbtn).toBeInTheDocument();
  });
});
