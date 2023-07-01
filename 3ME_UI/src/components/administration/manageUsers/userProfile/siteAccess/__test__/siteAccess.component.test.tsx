import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../../../util/ObjectFunctions";
import { SiteAccess } from "../siteAccess.component";
import { mockUserProfileData } from "../../userProfile.model";

describe("user profile component", () => {
  afterAll(() => {
    cleanup();
  });

  it("To check site access component present", async () => {
    const data = getDeepClone(mockUserProfileData);
    const isAddingNewUser = false;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SiteAccess
          facilities={data}
          setData={() => {}}
          addFacilityButtonClick={() => {}}
          isAddingNewUser={isAddingNewUser}
        />
        ;
      </MemoryRouter>
    );
    const component = screen.getByTestId("site-access-component");
    expect(component).toBeInTheDocument();
  });

  it("To check site access header present", async () => {
    const data = getDeepClone(mockUserProfileData);
    const isAddingNewUser = false;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SiteAccess
          facilities={data}
          setData={() => {}}
          addFacilityButtonClick={() => {}}
          isAddingNewUser={isAddingNewUser}
        />
        ;
      </MemoryRouter>
    );
    const header = screen.getByTestId("site-access-header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Site access");
  });

  it("To check site access description present", async () => {
    const data = getDeepClone(mockUserProfileData);
    const isAddingNewUser = false;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SiteAccess
          facilities={data}
          setData={() => {}}
          addFacilityButtonClick={() => {}}
          isAddingNewUser={isAddingNewUser}
        />
        ;
      </MemoryRouter>
    );
    const description = screen.getByTestId("site-access-description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "Choose what content and functionality is available to the user for each facility."
    );
  });

  it("To check site access add facility button present", async () => {
    const data = getDeepClone(mockUserProfileData);
    const isAddingNewUser = true;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SiteAccess
          facilities={data}
          setData={() => {}}
          addFacilityButtonClick={() => {}}
          isAddingNewUser={isAddingNewUser}
        />
        ;
      </MemoryRouter>
    );
    const addFacilityBtn = screen.getByTestId("addFacility-button");
    expect(addFacilityBtn).toBeInTheDocument();
  });
});
