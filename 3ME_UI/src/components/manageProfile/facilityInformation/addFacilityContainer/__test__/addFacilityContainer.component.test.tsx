import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { AddFacilityContainer } from "../addFacilityContainer.component";
import { SearchSection } from "../addFacilityContainer.enum";

describe("Add facility container component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("if patient is not found page, facilityNotFound component should be there", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityContainer defaultPageSection={SearchSection.NOT_FOUND} />
      </MemoryRouter>
    );
    const val = screen.getByTestId("facility-not-found");
    expect(val?.textContent).toContain("Facility Results");
  });

  it("default should be search form", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityContainer />
      </MemoryRouter>
    );
    const val = screen.getByTestId("facility-search");
    expect(val?.textContent).toBe("Facility Search");
  });

  it("if facility is found, facilityFound page should be displayed", () => {
    var mockFacilities = [
      {
        accountId: "10987651239",
        accountName: "Abbott Northwestern",
        typeName: "Home Health Agency",
        address1: "1800 17th Ave SE",
        address2: "",
        city: "Minneapolis",
        state: "MN",
        zip: 100001,
        accountNumber: 123456,
      },
    ];
    React.useState = jest.fn().mockReturnValue([mockFacilities, {}]);
    const loadSpinner: boolean = false;
    React.useState = jest.fn().mockReturnValue([loadSpinner, {}]);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityContainer defaultPageSection={SearchSection.FOUND} />
      </MemoryRouter>
    );
    const val = screen.getByTestId("facility-found");
    expect(val?.textContent).toContain("Facility Results");
  });
});
