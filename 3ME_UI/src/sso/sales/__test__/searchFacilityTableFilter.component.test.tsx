import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { defaultSalesRoleTestData } from "../salesRole.test.data";
import { SearchFacilityTableFilter } from "../searchFacilityTableFilter.component";

describe("SelectAFacilitySearch component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("SalesRoleFacility component Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityTableFilter
          validateAndSetData={() => {}}
          classification={[]}
          careSetting={[]}
          classificationText={[]}
          careSettingText={[]}
          searchInput={""}
          salesRolesData={defaultSalesRoleTestData}
          handleFacilitySearch={() => {}}
          salesRole={true}
        />
      </MemoryRouter>
    );
    const component = screen.getByTestId("salesRoleFacility");
    expect(component).toBeInTheDocument();
  });

  it("SalesRoleFacility classification  drop-down  Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityTableFilter
          validateAndSetData={() => {}}
          classification={[]}
          careSetting={[]}
          classificationText={[]}
          careSettingText={[]}
          searchInput={""}
          salesRolesData={defaultSalesRoleTestData}
          handleFacilitySearch={() => {}}
          salesRole={true}
        />
      </MemoryRouter>
    );
    const dropdown1 = screen.getByTestId("classification-DropDown");
    expect(dropdown1).toBeInTheDocument();
  });
  it("SalesRoleFacility caresetting drop-down Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityTableFilter
          validateAndSetData={() => {}}
          classification={[]}
          careSetting={[]}
          classificationText={[]}
          careSettingText={[]}
          searchInput={""}
          salesRolesData={defaultSalesRoleTestData}
          handleFacilitySearch={() => {}}
          salesRole={true}
        />
      </MemoryRouter>
    );
    const dropdown2 = screen.getByTestId("careSetting-DropDown");
    expect(dropdown2).toBeInTheDocument();
  });
});
