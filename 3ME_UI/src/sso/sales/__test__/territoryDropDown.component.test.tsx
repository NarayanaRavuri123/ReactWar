import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { TerritorySalesAndNonSales } from "../territoryDropDown.component";

describe("Territory component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("SalesRoleFacility Sub title Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TerritorySalesAndNonSales />
      </MemoryRouter>
    );
    const subtitle = screen.getByTestId("territoryView");
    expect(subtitle).toBeInTheDocument();
  });

  it("SalesRoleFacility territory view drop-down  Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TerritorySalesAndNonSales />
      </MemoryRouter>
    );
    const dropdown1 = screen.getByTestId("territory-view");
    expect(dropdown1).toBeInTheDocument();
  });
});
