import React from "react";
import { MemoryRouter } from "react-router-dom";
import { cleanup, render, screen } from "@testing-library/react";
import {
  FacilityMode,
  IFacility,
} from "../../../../manageProfile/facilityInformation/facility.interface";
import { FacilitySettingsHeader } from "../facilitySettingsHeader.component";
import { IFacilitySettingsHeader } from "../facilitySettingsHeader.interface";
jest.mock("../../../../../core/popup/popup.component");

describe("facility Settings Header component", () => {
  afterAll(() => {
    cleanup();
  });
  let mockResponseData: IFacility = {
    accountId: "192702",
    accountName: "University Medical Center",
    typeName: "Nusring home",
    addressId: "123",
    address1: "200 N Dupont St",
    address2: "",
    accountNumber: 123,
    zip: 12345,
    city: "Echo",
    careSetting: "Home",
    state: "OR",
    typeCode: "20",
    facilityMode: FacilityMode.LINKED,
  };

  it("To check Facility Name header validation", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IFacilitySettingsHeader) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([{}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <FacilitySettingsHeader
          selectedFacility={mockResponseData}
          setSelectedFacility={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("faciltiy-name");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("University Medical Center");
  });

  it("To check Facility Id header validation", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IFacilitySettingsHeader) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([{}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <FacilitySettingsHeader
          selectedFacility={mockResponseData}
          setSelectedFacility={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("faciltiy-id");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("#123");
  });
  it("To check Facility address city state zip header validation", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IFacilitySettingsHeader) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([{}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <FacilitySettingsHeader
          selectedFacility={mockResponseData}
          setSelectedFacility={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-address-city-state-zip");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("200 N Dupont St, Echo, OR 12345");
  });
  it("To check Facility classification header validation", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IFacilitySettingsHeader) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([{}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <FacilitySettingsHeader
          selectedFacility={mockResponseData}
          setSelectedFacility={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-classification-value");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Facility Classification");
  });
  it("To check Facility classification header validation", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IFacilitySettingsHeader) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([{}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <FacilitySettingsHeader
          selectedFacility={mockResponseData}
          setSelectedFacility={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("care setting");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Care Setting");
  });
});
