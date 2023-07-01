import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { defaultFacilityData } from "../caregiverFacilitySearchDefaultData";
import { getDeepClone } from "../../../util/ObjectFunctions";
import { FacilityMode } from "../caregiverFacilitySearchAndAdd.model";
import { CaregiverFacilitySearch } from "../caregiverFacilitySearch.component";
import { CaregiverFacilityFoundList } from "../caregiverFacilityFoundList.component";

describe("Caregiver Facility Search", () => {
  afterAll(() => {
    cleanup();
  });
  it("Home care provider header", () => {
    const data = getDeepClone(defaultFacilityData);
    const mockSetState = jest.fn();
    const mockFn = jest.fn();
    const useStateMock: any = (useState: any) => [
      (useState = []),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <CaregiverFacilitySearch
        data={data}
        setData={mockSetState}
        handleSearch={mockFn}
        redirectToProviderSearch={mockFn}
        statesText={[]}
      />
    );

    const elem = screen.getByText("Home Care Provider Search");
    expect(elem).toBeInTheDocument();
  });
  it("Search Facilities Database header", () => {
    const data = getDeepClone(defaultFacilityData);
    const mockSetState = jest.fn();
    const mockFn = jest.fn();
    const useStateMock: any = (useState: any) => [
      (useState = []),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <CaregiverFacilitySearch
        data={data}
        setData={mockSetState}
        handleSearch={mockFn}
        redirectToProviderSearch={mockFn}
        statesText={[]}
      />
    );

    const elem = screen.getByText("Search Facilities Database");
    expect(elem).toBeInTheDocument();
  });
  it("Search provider list button", () => {
    const data = getDeepClone(defaultFacilityData);
    const mockSetState = jest.fn();
    const mockFn = jest.fn();
    const useStateMock: any = (useState: any) => [
      (useState = []),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <CaregiverFacilitySearch
        data={data}
        setData={mockSetState}
        handleSearch={mockFn}
        redirectToProviderSearch={mockFn}
        statesText={[]}
      />
    );

    const elem = screen.getByTestId("search-provider-btn");
    expect(elem).toBeInTheDocument();
  });
  it("facility name label", () => {
    const data = getDeepClone(defaultFacilityData);
    const mockSetState = jest.fn();
    const mockFn = jest.fn();
    const useStateMock: any = (useState: any) => [
      (useState = []),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <CaregiverFacilitySearch
        data={data}
        setData={mockSetState}
        handleSearch={mockFn}
        redirectToProviderSearch={mockFn}
        statesText={[]}
      />
    );

    const elem = screen.getByTestId("facilityNameLabel");
    expect(elem).toBeInTheDocument();
  });
  it("facility name input", () => {
    const data = getDeepClone(defaultFacilityData);
    const mockSetState = jest.fn();
    const mockFn = jest.fn();
    const useStateMock: any = (useState: any) => [
      (useState = []),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <CaregiverFacilitySearch
        data={data}
        setData={mockSetState}
        handleSearch={mockFn}
        redirectToProviderSearch={mockFn}
        statesText={[]}
      />
    );

    const elem = screen.getByTestId("facilityName");
    expect(elem).toBeInTheDocument();
  });
  it("facility state dropdown", () => {
    const data = getDeepClone(defaultFacilityData);
    const mockSetState = jest.fn();
    const mockFn = jest.fn();
    const useStateMock: any = (useState: any) => [
      (useState = []),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <CaregiverFacilitySearch
        data={data}
        setData={mockSetState}
        handleSearch={mockFn}
        redirectToProviderSearch={mockFn}
        statesText={[]}
      />
    );

    const elem = screen.getByTestId("facility-state-dropdown");
    expect(elem).toBeInTheDocument();
  });
  it("facility search button 1", () => {
    const data = getDeepClone(defaultFacilityData);
    const mockSetState = jest.fn();
    const mockFn = jest.fn();
    const useStateMock: any = (useState: any) => [
      (useState = []),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <CaregiverFacilitySearch
        data={data}
        setData={mockSetState}
        handleSearch={mockFn}
        redirectToProviderSearch={mockFn}
        statesText={[]}
      />
    );

    const elem = screen.getByTestId("search-btn1");
    expect(elem).toBeInTheDocument();
  });
  it("facility id input", () => {
    const data = getDeepClone(defaultFacilityData);
    const mockSetState = jest.fn();
    const mockFn = jest.fn();
    const useStateMock: any = (useState: any) => [
      (useState = []),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <CaregiverFacilitySearch
        data={data}
        setData={mockSetState}
        handleSearch={mockFn}
        redirectToProviderSearch={mockFn}
        statesText={[]}
      />
    );

    const elem = screen.getByTestId("facilityID");
    expect(elem).toBeInTheDocument();
  });
  it("facility search button 2", () => {
    const data = getDeepClone(defaultFacilityData);
    const mockSetState = jest.fn();
    const mockFn = jest.fn();
    const useStateMock: any = (useState: any) => [
      (useState = []),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <CaregiverFacilitySearch
        data={data}
        setData={mockSetState}
        handleSearch={mockFn}
        redirectToProviderSearch={mockFn}
        statesText={[]}
      />
    );

    const elem = screen.getByTestId("search-btn2");
    expect(elem).toBeInTheDocument();
  });
  it("facility list select header", () => {
    render(
      <CaregiverFacilityFoundList
        facilities={[
          {
            address1: "",
            address2: "",
            city: "",
            country: "",
            customerAccountNumber: "",
            customerName: "",
            marketingSegmentCode: "",
            marketingSegmentDescription: "",
            origSystemReference: "",
            phoneNo: "",
            postalCode: "",
            siteUseId: "",
            state: "",
            status: "",
            extension: "",
          },
        ]}
        handleBackToSearch={() => {}}
        handleSelect={() => {}}
      />
    );

    const elem = screen.getByText("Select");
    expect(elem).toBeInTheDocument();
  });
  it("facility list account name", () => {
    render(
      <CaregiverFacilityFoundList
        facilities={[
          {
            address1: "",
            address2: "",
            city: "",
            country: "",
            customerAccountNumber: "",
            customerName: "",
            marketingSegmentCode: "",
            marketingSegmentDescription: "",
            origSystemReference: "",
            phoneNo: "",
            postalCode: "",
            siteUseId: "",
            state: "",
            status: "",
            extension: "",
          },
        ]}
        handleBackToSearch={() => {}}
        handleSelect={() => {}}
      />
    );

    const elem1 = screen.getByTestId("fl-facility-name");
    expect(elem1).toBeInTheDocument();
    const elem2 = screen.getByTestId("address1");
    expect(elem2).toBeInTheDocument();
    const elem4 = screen.getByTestId("address3");
    expect(elem4).toBeInTheDocument();
    const elem5 = screen.getByTestId("facility-type");
    expect(elem5).toBeInTheDocument();
  });
});
