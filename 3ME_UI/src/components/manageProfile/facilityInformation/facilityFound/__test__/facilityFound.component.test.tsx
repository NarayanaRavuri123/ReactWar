import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchSection } from "../../addFacilityContainer/addFacilityContainer.enum";
import { FacilityMode } from "../../facility.interface";
import { FacilityFound } from "../facilityFound.component";

describe("Facility Found component ->", () => {
  afterAll(() => {
    cleanup();
  });

  jest.mock("react-router-dom", () => ({
    useLocation: jest.fn().mockReturnValue({
      pathname: "/another-route",
      search: "",
      hash: "",
      state: null,
      key: "5nvxpbdafa",
    }),
  }));

  it("name should be visible", () => {
    const spyFn = jest.fn();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <FacilityFound
          redirectHandler={spyFn}
          facilities={[
            {
              accountId: "10987654789",
              accountName: "Abbott Northwestern",
              typeName: "Home Health Agency",
              addressId: "10987654789",
              address1: "1800 17th Ave SE",
              address2: "",
              city: "Minneapolis",
              state: "MN",
              zip: 100001,
              accountNumber: 123456,
              typeCode: "20",
              facilityMode: FacilityMode.LINKED,
              siteUseId: "324564",
              careGiverId: "345678",
            },
          ]}
        />
      </MemoryRouter>
    );
    const val = screen.getByTestId("facility-name");
    expect(val?.textContent).toBe("Abbott Northwestern");
  });

  it("on click of search again, redirectHandler should be called", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <FacilityFound
          redirectHandler={spyFn}
          facilities={[
            {
              accountId: "10987651239",
              accountName: "Abbott Northwestern",
              typeName: "Home Health Agency",
              addressId: "10987651239",
              address1: "1800 17th Ave SE",
              address2: "",
              city: "Minneapolis",
              state: "MN",
              zip: 100001,
              accountNumber: 123456,
              typeCode: "20",
              facilityMode: FacilityMode.LINKED,
              siteUseId: "32456",
              careGiverId: "657897",
            },
          ]}
        />
      </MemoryRouter>
    );
    fireEvent.click(document.querySelector(".back-to-search-btn")!);
    expect(spyFn).toHaveBeenCalledWith(SearchSection.SEARCH_FORM);
  });
});
