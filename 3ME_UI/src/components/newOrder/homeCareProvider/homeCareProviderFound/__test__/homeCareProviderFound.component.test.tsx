import { cleanup, render, screen } from "@testing-library/react";
import { defaultHomeCareProviderList } from "../../../../../mockData/homeCareProviderData";
import { HomeCareProviderFound } from "../homeCareProviderFound.component";

describe("Home Care Provider Found Component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Header test", () => {
    render(
      <HomeCareProviderFound
        data={defaultHomeCareProviderList[0]}
        handleSelectedHomeCareProvider={() => {}}
        handleHomeCareProviderSearchType={() => {}}
      />
    );
    const title = screen.getByTestId("home-care-provider-found-header");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Home Care Provider Search");
  });

  it("Render selected home care provider select button", () => {
    render(
      <HomeCareProviderFound
        data={defaultHomeCareProviderList[0]}
        handleSelectedHomeCareProvider={() => {}}
        handleHomeCareProviderSearchType={() => {}}
      />
    );
    const selectTitle = screen.getByTestId("home-care-provider-select");
    expect(selectTitle).toBeInTheDocument();
    expect(selectTitle).toHaveTextContent("Select");
  });

  it("Render selected home care provider name", () => {
    render(
      <HomeCareProviderFound
        data={defaultHomeCareProviderList[0]}
        handleSelectedHomeCareProvider={() => {}}
        handleHomeCareProviderSearchType={() => {}}
      />
    );
    const name = screen.getByTestId("home-care-provider-name");
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent("Animal Wound Care Clinic");
  });

  it("Render selected home care provider address", () => {
    render(
      <HomeCareProviderFound
        data={defaultHomeCareProviderList[0]}
        handleSelectedHomeCareProvider={() => {}}
        handleHomeCareProviderSearchType={() => {}}
      />
    );
    const address = screen.getByTestId("home-care-provider-address");
    expect(address).toBeInTheDocument();
    expect(address).toHaveTextContent("1800 17th Ave Se Apt 406");
  });

  it("Render selected home care provider city state and zip", () => {
    render(
      <HomeCareProviderFound
        data={defaultHomeCareProviderList[0]}
        handleSelectedHomeCareProvider={() => {}}
        handleHomeCareProviderSearchType={() => {}}
      />
    );
    const cityStateZip = screen.getByTestId(
      "home-care-provider-city-state-zip"
    );
    expect(cityStateZip).toBeInTheDocument();
    expect(cityStateZip).toHaveTextContent("Cartelville, IL 66554");
  });

  it("Render selected home care provider addrphoneess", () => {
    render(
      <HomeCareProviderFound
        data={defaultHomeCareProviderList[0]}
        handleSelectedHomeCareProvider={() => {}}
        handleHomeCareProviderSearchType={() => {}}
      />
    );
    const phone = screen.getByTestId("home-care-provider-phone");
    expect(phone).toBeInTheDocument();
    expect(phone).toHaveTextContent("Phone 123-456-7890");
  });

  it("Render selected home care provider facilityType", () => {
    render(
      <HomeCareProviderFound
        data={defaultHomeCareProviderList[0]}
        handleSelectedHomeCareProvider={() => {}}
        handleHomeCareProviderSearchType={() => {}}
      />
    );
    const facilityType = screen.getByTestId("home-care-provider-facilityType");
    expect(facilityType).toBeInTheDocument();
    expect(facilityType).toHaveTextContent("Type Wound Care Clinic");
  });

  it("Back to search Button", () => {
    render(
      <HomeCareProviderFound
        data={defaultHomeCareProviderList[0]}
        handleSelectedHomeCareProvider={() => {}}
        handleHomeCareProviderSearchType={() => {}}
      />
    );
    const title = screen.getByTestId("back-to-search");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Back to Search");
  });
});
