import { cleanup, render, screen } from "@testing-library/react";
import { useContext } from "react";
import { MemoryRouter } from "react-router-dom";
import SearchFacilityResult from "../searchFacilityResult.component";
import * as React from "react";
describe("Search FacilityResult component->", () => {
  afterAll(() => {
    cleanup();
  });
  const testColumns = [
    { label: "", accessor: "select", sortable: false },
    {
      label: "Facility Site Name",
      accessor: "facility Site Name",
      sortable: true,
    },
    { label: "Favorite", accessor: "accountName", sortable: true },
    { label: "Facility No.", accessor: "accountNumber", sortable: true },
    {
      label: "Classification",
      accessor: "typeName",
      sortable: true,
    },
    { label: "Setting", accessor: "careSetting", sortable: true },
  ];

  const testSortedData = [
    {
      accountId: "14146",
      accountName: "PEACEHEALTH KETCHIKAN MEDICAL CENTER",
      accountNumber: "547215",
      address1: "3100 TONGASS AVE",
      address2: null,
      addressId: "14547",
      careSetting: "ACUTE",
      city: "KETCHIKAN",
      facilityAddressID: 0,
      isFavourite: true,
      location: "00:KETCHIKAN:AK",
      primaryFlag: "Y",
      readyCareFlag: "Y",
      siteUseId: "22480",
      state: "AK",
      typeCode: "01",
      typeName: "HOSPITAL NON-GOVT",
      zip: "99901",
    },
  ];

  it("search result title present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityResult
          sortedData={testSortedData}
          setSortedData={() => {}}
          handleSorting={() => {}}
          columns={testColumns}
          isLoading={false}
          data={[]}
          salesRole={false}
          isSearchSelected={true}
          setIsSearchSelected={() => {}}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("search-facility-result");
    expect(header).toBeInTheDocument();
  });
  it(" Search result table  present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityResult
          sortedData={testSortedData}
          setSortedData={() => {}}
          handleSorting={() => {}}
          columns={testColumns}
          isLoading={false}
          data={[]}
          salesRole={false}
          isSearchSelected={true}
          setIsSearchSelected={() => {}}
        />
      </MemoryRouter>
    );
    const content = screen.getByTestId("search-facility-result-test");
    expect(content).toBeInTheDocument();
  });
  it(" select link in table present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityResult
          sortedData={testSortedData}
          setSortedData={() => {}}
          handleSorting={() => {}}
          columns={testColumns}
          isLoading={false}
          data={[]}
          salesRole={false}
          isSearchSelected={true}
          setIsSearchSelected={() => {}}
        />
      </MemoryRouter>
    );
    const content = screen.getByTestId("selectLinktest");
    expect(content).toBeInTheDocument();
  });

  it(" select facility link in table present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityResult
          sortedData={testSortedData}
          setSortedData={() => {}}
          handleSorting={() => {}}
          columns={testColumns}
          isLoading={false}
          data={[]}
          salesRole={false}
          isSearchSelected={true}
          setIsSearchSelected={() => {}}
        />
      </MemoryRouter>
    );
    const content = screen.getByTestId("selectLinktest");
    expect(content).toBeInTheDocument();
  });
  it("select facility account name in table present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityResult
          sortedData={testSortedData}
          setSortedData={() => {}}
          handleSorting={() => {}}
          columns={testColumns}
          isLoading={false}
          data={[]}
          salesRole={false}
          isSearchSelected={true}
          setIsSearchSelected={() => {}}
        />
      </MemoryRouter>
    );
    const content = screen.getByTestId("selectFacilityAccountNametest");
    expect(content).toBeInTheDocument();
  });
  it("select facility Favourite in table present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityResult
          sortedData={testSortedData}
          setSortedData={() => {}}
          handleSorting={() => {}}
          columns={testColumns}
          isLoading={false}
          data={[]}
          salesRole={false}
          isSearchSelected={true}
          setIsSearchSelected={() => {}}
        />
      </MemoryRouter>
    );
    const content = screen.getByTestId("selectFacilityFavouritetest");
    expect(content).toBeInTheDocument();
  });
  it("select account number in table present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityResult
          sortedData={testSortedData}
          setSortedData={() => {}}
          handleSorting={() => {}}
          columns={testColumns}
          isLoading={false}
          data={[]}
          salesRole={false}
          isSearchSelected={true}
          setIsSearchSelected={() => {}}
        />
      </MemoryRouter>
    );
    const content = screen.getByTestId("selectFacilityAccountNumbertest");
    expect(content).toBeInTheDocument();
  });
  it("select facility type name in table present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityResult
          sortedData={testSortedData}
          setSortedData={() => {}}
          handleSorting={() => {}}
          columns={testColumns}
          isLoading={false}
          data={[]}
          salesRole={false}
          isSearchSelected={true}
          setIsSearchSelected={() => {}}
        />
      </MemoryRouter>
    );
    const content = screen.getByTestId("selectFacilityTypeNametest");
    expect(content).toBeInTheDocument();
  });
  it("select facility caresetting in table present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityResult
          sortedData={testSortedData}
          setSortedData={() => {}}
          handleSorting={() => {}}
          columns={testColumns}
          isLoading={false}
          data={[]}
          salesRole={false}
          isSearchSelected={true}
          setIsSearchSelected={() => {}}
        />
      </MemoryRouter>
    );
    const content = screen.getByTestId("selectFacilityCareSettingtest");
    expect(content).toBeInTheDocument();
  });

  it("select facility pagination in table present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityResult
          sortedData={testSortedData}
          setSortedData={() => {}}
          handleSorting={() => {}}
          columns={testColumns}
          isLoading={false}
          data={[]}
          salesRole={false}
          isSearchSelected={true}
          setIsSearchSelected={() => {}}
        />
      </MemoryRouter>
    );
    const content = screen.getByTestId("paginationTablePresent");
    expect(content).toBeInTheDocument();
  });
  it("select dropdown pagination in table present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityResult
          sortedData={testSortedData}
          setSortedData={() => {}}
          handleSorting={() => {}}
          columns={testColumns}
          isLoading={false}
          data={[]}
          salesRole={false}
          isSearchSelected={true}
          setIsSearchSelected={() => {}}
        />
      </MemoryRouter>
    );
    const content = screen.getByTestId("itemsPerPage");
    expect(content).toBeInTheDocument();
  });

  it("select data length  in table present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchFacilityResult
          sortedData={testSortedData}
          setSortedData={() => {}}
          handleSorting={() => {}}
          columns={testColumns}
          isLoading={false}
          data={[]}
          salesRole={false}
          isSearchSelected={true}
          setIsSearchSelected={() => {}}
        />
      </MemoryRouter>
    );
    const content = screen.getByTestId("totalCounts");
    expect(content).toBeInTheDocument();
  });
});
