import { MemoryRouter } from "react-router-dom";
import { cleanup, render, screen } from "@testing-library/react";
import { RegistrationForm } from "../registrationForm.component";
import { ProfileFormContext } from "../../../../context/ProfileFormContext";
import { getMockRegistrationFormData } from "../registrationFormMockContextData";
jest.mock("../../../../components/manageProfile/manageProfile.validator");

describe("Registration Form ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Validate Enter contact information section", () => {
    render(
      <ProfileFormContext.Provider
        value={{
          ...getMockRegistrationFormData(),
        }}
      >
        <MemoryRouter initialEntries={["/"]}>
          <RegistrationForm setProgbarVal={() => {}} />
        </MemoryRouter>
      </ProfileFormContext.Provider>
    );
    const header = screen.getByTestId("registration-form-header");
    expect(header).toHaveTextContent("Enter contact information");
    const description1 = screen.getByTestId("form-descripton1");
    expect(description1).toHaveTextContent(
      "This portal is intended for use by clinicians in the United States."
    );
    const description2 = screen.getByTestId("form-descripton2");
    expect(description2).toHaveTextContent(
      "Note: For further assistance, you may call our National Contact Center at (800) 275 - 4524 ext. 41858"
    );
  });

  it("Validate Account Information section", () => {
    render(
      <ProfileFormContext.Provider
        value={{
          ...getMockRegistrationFormData(),
        }}
      >
        <MemoryRouter initialEntries={["/"]}>
          <RegistrationForm setProgbarVal={() => {}} />
        </MemoryRouter>
      </ProfileFormContext.Provider>
    );
    const accountInfo = screen.getByTestId("accountInfo");
    expect(accountInfo).toBeInTheDocument();
  });

  it("Validate Contact Information section", () => {
    render(
      <ProfileFormContext.Provider
        value={{
          ...getMockRegistrationFormData(),
        }}
      >
        <MemoryRouter initialEntries={["/"]}>
          <RegistrationForm setProgbarVal={() => {}} />
        </MemoryRouter>
      </ProfileFormContext.Provider>
    );
    const contactInformation = screen.getByTestId("contact-information");
    expect(contactInformation).toBeInTheDocument();
  });

  it("Validate Password Administration section", () => {
    render(
      <ProfileFormContext.Provider
        value={{
          ...getMockRegistrationFormData(),
        }}
      >
        <MemoryRouter initialEntries={["/"]}>
          <RegistrationForm setProgbarVal={() => {}} />
        </MemoryRouter>
      </ProfileFormContext.Provider>
    );
    const passwordAdministation = screen.getByTestId("password-administation");
    expect(passwordAdministation).toBeInTheDocument();
  });

  it("Validate Communication Preferences section", () => {
    render(
      <ProfileFormContext.Provider
        value={{
          ...getMockRegistrationFormData(),
        }}
      >
        <MemoryRouter initialEntries={["/"]}>
          <RegistrationForm setProgbarVal={() => {}} />
        </MemoryRouter>
      </ProfileFormContext.Provider>
    );
    const communicationPreferences = screen.getByTestId(
      "communication-preferences"
    );
    expect(communicationPreferences).toBeInTheDocument();
  });

  it("Validate Facility Information section", () => {
    render(
      <ProfileFormContext.Provider
        value={{
          ...getMockRegistrationFormData(),
        }}
      >
        <MemoryRouter initialEntries={["/"]}>
          <RegistrationForm setProgbarVal={() => {}} />
        </MemoryRouter>
      </ProfileFormContext.Provider>
    );
    const facilityInformation = screen.getByTestId("all-facilities");
    expect(facilityInformation).toBeInTheDocument();
  });
});
