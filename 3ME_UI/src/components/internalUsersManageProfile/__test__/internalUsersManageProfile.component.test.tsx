import { MemoryRouter } from "react-router-dom";
import React from "react";
import { InternalUsersManageProfile } from "../internalusersManageProfile.component";
import { AuthContext } from "../../../context/AuthContext";
import { getMockAuthContextData } from "../../header/__test__/authContextMockData";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";

describe("Internal Users Manage Profile component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate loader", () => {
    render(<InternalUsersManageProfile />);
    const title = screen.getByTestId("loading-text-large");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Loading");
    const description = screen.getByTestId("loading-text-small");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("Processing your request...");
  });
  it("Internal Users ,manage profile Component render", () => {
    const loaderSpinner = false;
    React.useState = jest.fn().mockReturnValue([loaderSpinner, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            isInternalUser: true,
          }}
        >
          <InternalUsersManageProfile />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("internalUser-MP-page");
    expect(component).toBeInTheDocument();
  });
  it("Validate InternalUser contact section", async () => {
    const mockResponse = { title: "Test" };
    const mRes = { json: jest.fn().mockResolvedValueOnce(mockResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    global.fetch = mockedFetch;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            isInternalUser: true,
          }}
        >
          <InternalUsersManageProfile />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    await act(async () => {
      await waitFor(() => expect(mockedFetch).toHaveBeenCalled);
    });
    const internal = screen.getByTestId("internalUser-mp-container-main");
    expect(internal).toBeInTheDocument();
  });
});
