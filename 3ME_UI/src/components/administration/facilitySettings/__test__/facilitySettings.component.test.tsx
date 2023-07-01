import React from "react";
import { MemoryRouter } from "react-router-dom";
import { FacilitySettings } from "../facilitySettings.component";
import { cleanup, render, screen } from "@testing-library/react";
import { getMockFacilitySettingsData } from "./facilitySettingsMockContext.data";
import { FacilitySettingContext } from "../../../../context/FacilitySettingsContext";
import { AuthContext } from "../../../../context/AuthContext";
import { getMockAuthContextData } from "../../../header/__test__/authContextMockData";
jest.mock("../../../../core/popup/popup.component");

describe("facility setting component", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Facility setting header component validation", () => {
    React.useState = jest.fn().mockReturnValue([{}]);
    render(
      <AuthContext.Provider
        value={{
          ...getMockAuthContextData(),
        }}
      >
        <FacilitySettingContext.Provider
          value={{
            ...getMockFacilitySettingsData(),
          }}
        >
          <MemoryRouter initialEntries={["/"]}>
            <FacilitySettings />
          </MemoryRouter>
        </FacilitySettingContext.Provider>
      </AuthContext.Provider>
    );
    const title = screen.getByTestId("facility-settings-header");
    expect(title).toBeInTheDocument();
  });

  it("To check Facility Permission component validation", () => {
    React.useState = jest.fn().mockReturnValue([{}]);
    render(
      <AuthContext.Provider
        value={{
          ...getMockAuthContextData(),
        }}
      >
        <FacilitySettingContext.Provider
          value={{
            ...getMockFacilitySettingsData(),
          }}
        >
          <MemoryRouter initialEntries={["/"]}>
            <FacilitySettings />
          </MemoryRouter>
        </FacilitySettingContext.Provider>
      </AuthContext.Provider>
    );
    const title = screen.getByTestId("facility-permission");
    expect(title).toBeInTheDocument();
  });

  it("To check Facility settings buttons validation", () => {
    React.useState = jest.fn().mockReturnValue([{}]);
    render(
      <AuthContext.Provider
        value={{
          ...getMockAuthContextData(),
        }}
      >
        <FacilitySettingContext.Provider
          value={{
            ...getMockFacilitySettingsData(),
          }}
        >
          <MemoryRouter initialEntries={["/"]}>
            <FacilitySettings />
          </MemoryRouter>
        </FacilitySettingContext.Provider>
      </AuthContext.Provider>
    );
    const title = screen.getByTestId("button-group");
    expect(title).toBeInTheDocument();
  });
});
