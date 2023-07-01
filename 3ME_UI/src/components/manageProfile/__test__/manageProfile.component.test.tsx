import { MemoryRouter } from "react-router-dom";
import { ManageProfile } from "../manageProfile.component";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { AuthContext } from "../../../context/AuthContext";
import { getMockAuthContextData } from "../../header/__test__/authContextMockData";
jest.mock("../manageProfile.validator");

describe("Manage Profile component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Validate Account Information section", async () => {
    const fakeResponse = { title: "Test" };
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    global.fetch = mockedFetch;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            isInternalUser: false,
          }}
        >
          <ManageProfile setProgbarVal={() => {}} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    await act(async () => {
      await waitFor(() => expect(mockedFetch).toHaveBeenCalledTimes(1));
    });
    const accountInfo = screen.getByTestId("accountInfo");
    expect(accountInfo).toBeInTheDocument();
  });

  it("Validate Facility Information section", async () => {
    const fakeResponse = { title: "Test" };
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    global.fetch = mockedFetch;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            isInternalUser: false,
          }}
        >
          <ManageProfile setProgbarVal={() => {}} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    await act(async () => {
      await waitFor(() => expect(mockedFetch).toHaveBeenCalledTimes(1));
    });
    const facilityInformation = screen.getByTestId("all-facilities");
    expect(facilityInformation).toBeInTheDocument();
  });

  it("Validate Communication Preferences section", async () => {
    const fakeResponse = { title: "Test" };
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    global.fetch = mockedFetch;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            isInternalUser: false,
          }}
        >
          <ManageProfile setProgbarVal={() => {}} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    await act(async () => {
      await waitFor(() => expect(mockedFetch).toHaveBeenCalledTimes(1));
    });
    const communicationPreferences = screen.getByTestId(
      "communication-preferences"
    );
    expect(communicationPreferences).toBeInTheDocument();
  });

  it("Validate Email Notification Preferences section", async () => {
    const fakeResponse = { title: "Test" };
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    global.fetch = mockedFetch;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            isInternalUser: false,
          }}
        >
          <ManageProfile setProgbarVal={() => {}} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    await act(async () => {
      await waitFor(() => expect(mockedFetch).toHaveBeenCalledTimes(1));
    });
    const emailNotificationPreferences = screen.getByTestId(
      "email-notification-prefereces"
    );
    expect(emailNotificationPreferences).toBeInTheDocument();
  });
});
