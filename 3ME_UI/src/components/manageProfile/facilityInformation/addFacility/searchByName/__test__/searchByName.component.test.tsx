import { FacilityMode, IFacility } from "../../../facility.interface";
import { IFacilitySearchRequest } from "../../searchFacility.interface";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import {
  defaultSearchDataForID,
  defaultSearchDataForName,
} from "../../searchFacility.model";
import { SearchByName } from "../searchByName.component";
import userEvent from "@testing-library/user-event";

describe("Search facility ui by name ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Facility Search Label Facility Name", () => {
    const mockSetState = jest.fn();
    const spyFn = jest.fn();
    render(
      <SearchByName
        facilitySearchDataForID={defaultSearchDataForID}
        facilitySearchDataForName={defaultSearchDataForName}
        onSubmit={spyFn}
        setfacilitySearchDataForID={spyFn}
        setfacilitySearchDataForName={spyFn}
      />
    );
    const description = screen.getByTestId("facility-name-label");
    expect(description).toBeInTheDocument();
    const title = screen.getByTestId("facility-name");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Facility Name");
    const value = screen.getByTestId("facility-name-value");
    expect(value).toBeInTheDocument();
    userEvent.type(value, "Baylor");
    expect(spyFn).toBeCalled();
  });
  it("Facility Search State Component", () => {
    const spyFn = jest.fn();
    render(
      <SearchByName
        facilitySearchDataForID={defaultSearchDataForID}
        facilitySearchDataForName={defaultSearchDataForName}
        onSubmit={spyFn}
        setfacilitySearchDataForID={spyFn}
        setfacilitySearchDataForName={spyFn}
      />
    );
    const description = screen.getByTestId("facility-state-component");
    expect(description).toBeInTheDocument();
    const dropdown = screen.getByTestId("facility-state-select");
    expect(dropdown).toBeInTheDocument();
  });
  it("Facility Search Button Grid", () => {
    const spyFn = jest.fn();
    render(
      <SearchByName
        facilitySearchDataForID={defaultSearchDataForID}
        facilitySearchDataForName={defaultSearchDataForName}
        onSubmit={spyFn}
        setfacilitySearchDataForID={spyFn}
        setfacilitySearchDataForName={spyFn}
      />
    );
    const button = screen.getByTestId("facility-search-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Search");
  });
});
