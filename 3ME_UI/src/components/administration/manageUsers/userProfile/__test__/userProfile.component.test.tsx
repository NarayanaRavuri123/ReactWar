import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { UserProfile } from "../userProfile.component";
import { createMemoryHistory } from "history";
import React from "react";
import { UserProfileContext } from "../../../../../context/UserProfileContext";
import { getMockUserProfileContextData } from "./userProfileMockContext.data";

describe("user profile component", () => {
  afterAll(() => {
    cleanup();
  });

  it("To check user profile component present", async () => {
    const isAddingNewUser = false;
    const history = createMemoryHistory();
    history.push({
      pathname: "/administration/manageUsers/userProfile",
      state: {
        isAddingNewUser: isAddingNewUser,
        selectedUserName: "test",
      },
    });
    render(
      <UserProfileContext.Provider
        value={{
          ...getMockUserProfileContextData(),
        }}
      >
        <Router history={history}>
          <UserProfile />
        </Router>
      </UserProfileContext.Provider>
    );
    const component = screen.getByTestId("user-profile-component");
    expect(component).toBeInTheDocument();
  });

  it("To check user profile navigator present", async () => {
    const isAddingNewUser = false;
    const history = createMemoryHistory();
    history.push({
      pathname: "/administration/manageUsers/userProfile",
      state: {
        isAddingNewUser: isAddingNewUser,
        selectedUserName: "test",
      },
    });
    render(
      <UserProfileContext.Provider
        value={{
          ...getMockUserProfileContextData(),
        }}
      >
        <Router history={history}>
          <UserProfile />
        </Router>
      </UserProfileContext.Provider>
    );
    const navigator = screen.getByTestId("user-profile-route-section");
    expect(navigator).toBeInTheDocument();
  });

  it("To check user profile navigator present", async () => {
    const isAddingNewUser = false;
    const history = createMemoryHistory();
    history.push({
      pathname: "/administration/manageUsers/userProfile",
      state: {
        isAddingNewUser: isAddingNewUser,
        selectedUserName: "test",
      },
    });
    render(
      <UserProfileContext.Provider
        value={{
          ...getMockUserProfileContextData(),
        }}
      >
        <Router history={history}>
          <UserProfile />
        </Router>
      </UserProfileContext.Provider>
    );
    const navigator = screen.getByTestId("user-profile-route-section");
    expect(navigator).toBeInTheDocument();
  });

  it("To check user profile User name", async () => {
    const isAddingNewUser = false;
    const history = createMemoryHistory();
    history.push({
      pathname: "/administration/manageUsers/userProfile",
      state: {
        isAddingNewUser: isAddingNewUser,
        selectedUserName: "test",
      },
    });
    render(
      <UserProfileContext.Provider
        value={{
          ...getMockUserProfileContextData(),
        }}
      >
        <Router history={history}>
          <UserProfile />
        </Router>
      </UserProfileContext.Provider>
    );
    const header = screen.getByTestId("user-profile-hearder");
    expect(header).toBeInTheDocument();
  });

  it("To check user profile reset password button", async () => {
    const isAddingNewUser = false;
    const history = createMemoryHistory();
    history.push({
      pathname: "/administration/manageUsers/userProfile",
      state: {
        isAddingNewUser: isAddingNewUser,
        selectedUserName: "test",
      },
    });
    render(
      <UserProfileContext.Provider
        value={{
          ...getMockUserProfileContextData(),
        }}
      >
        <Router history={history}>
          <UserProfile />
        </Router>
      </UserProfileContext.Provider>
    );
    const resetButton = screen.getByTestId("reset-password");
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toHaveTextContent("Reset password");
    fireEvent.click(resetButton);
  });
});
