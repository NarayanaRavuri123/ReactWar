import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { SearchFacilityDataBase } from "../searchFacilities.component";

describe("SelectAFacilitySearch component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("SearchFacility Title Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityDataBase />
      </MemoryRouter>
    );
    const title = screen.getByTestId("search-facility-title-test");
    expect(title).toBeInTheDocument();
  });

  it("SearchFacility SearchByName Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityDataBase />
      </MemoryRouter>
    );
    const other = screen.getByTestId("selectFacility-searchByName-test");
    expect(other).toBeInTheDocument();
  });

  it("SearchFacility or Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityDataBase />
      </MemoryRouter>
    );
    const other = screen.getByTestId("selectFacility-Or-test");
    expect(other).toBeInTheDocument();
  });

  it("Select facility SearchByID Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityDataBase />
      </MemoryRouter>
    );
    const other = screen.getByTestId("selectFacility-serachById-test");
    expect(other).toBeInTheDocument();
  });
});
