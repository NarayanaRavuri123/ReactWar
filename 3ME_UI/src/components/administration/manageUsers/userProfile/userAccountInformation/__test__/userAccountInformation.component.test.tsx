import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../../../util/ObjectFunctions";
import React from "react";
import { mockUserProfileData } from "../../userProfile.model";
import { UserAccountInformation } from "../userAccountInformation.component";

describe("user profile component", () => {
  afterAll(() => {
    cleanup();
  });

  it("To check account information component present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const component = screen.getByTestId("user-profile-account-info-component");
    expect(component).toBeInTheDocument();
  });

  it("To check account information header present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const accountInfooHeader = screen.getByTestId(
      "user-profile-account-header"
    );
    expect(accountInfooHeader).toBeInTheDocument();
    expect(accountInfooHeader).toHaveTextContent("Account Information");
  });

  it("To check account information first name label present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const firstNameLabel = screen.getByTestId("first-name-label");
    expect(firstNameLabel).toBeInTheDocument();
    expect(firstNameLabel).toHaveTextContent("First name");
  });

  it("To check account information first name present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const firstName = screen.getByTestId("acc-first-name");
    expect(firstName).toBeInTheDocument();
  });

  it("To check account information last name label present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const lastNameLabel = screen.getByTestId("last-name-label");
    expect(lastNameLabel).toBeInTheDocument();
    expect(lastNameLabel).toHaveTextContent("Last name");
  });

  it("To check account information last name present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const lastName = screen.getByTestId("acc-last-name");
    expect(lastName).toBeInTheDocument();
  });

  it("To check account information user name label present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const userNameLabel = screen.getByTestId("userName-name-label");
    expect(userNameLabel).toBeInTheDocument();
    expect(userNameLabel).toHaveTextContent("Username");
  });

  it("To check account information user name present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const userName = screen.getByTestId("acc-user-name");
    expect(userName).toBeInTheDocument();
  });

  it("To check account information license type label present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const licenseTypeLabel = screen.getByTestId("license-type-label");
    expect(licenseTypeLabel).toBeInTheDocument();
    expect(licenseTypeLabel).toHaveTextContent("License type");
  });

  it("To check account information license type present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const licenseTypeName = screen.getByTestId("acc-license-type");
    expect(licenseTypeName).toBeInTheDocument();
  });

  it("To check account information department label present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const departmentLabel = screen.getByTestId("department-label");
    expect(departmentLabel).toBeInTheDocument();
    expect(departmentLabel).toHaveTextContent("Department");
  });

  it("To check account information department present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const departmentName = screen.getByTestId("acc-department-type");
    expect(departmentName).toBeInTheDocument();
  });

  it("To check account information title label present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const titleLabel = screen.getByTestId("title-label");
    expect(titleLabel).toBeInTheDocument();
    expect(titleLabel).toHaveTextContent("Title");
  });

  it("To check account information title present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("acc-title");
    expect(title).toBeInTheDocument();
  });

  it("To check account information email label present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const emailLabel = screen.getByTestId("user-profile-email-title");
    expect(emailLabel).toBeInTheDocument();
    expect(emailLabel).toHaveTextContent("Email Address");
  });

  it("To check account information email present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const email = screen.getByTestId("user-profile-email");
    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent("abc@gmail.com");
  });

  it("To check account information phone label present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const phoneLabel = screen.getByTestId("user-profile-phone-title");
    expect(phoneLabel).toBeInTheDocument();
    expect(phoneLabel).toHaveTextContent("Phone Number");
  });

  it("To check account information phone present", async () => {
    const licenseType = "CNA";
    const department = "Administration";
    const data = getDeepClone(mockUserProfileData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserAccountInformation
          data={data}
          setData={() => {}}
          licenseType={licenseType}
          department={department}
        />
      </MemoryRouter>
    );
    const phone = screen.getByTestId("user-profile-phone");
    expect(phone).toBeInTheDocument();
    expect(phone).toHaveTextContent("102-345-6789");
  });
});
