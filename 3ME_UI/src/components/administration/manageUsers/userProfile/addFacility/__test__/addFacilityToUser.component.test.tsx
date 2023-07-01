import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AddFacilityToUser } from "../addFacilityToUser.component";
import { IFacilityToUser } from "../addFacilityToUser.interface";

describe("manage users component", () => {
  afterAll(() => {
    cleanup();
  });

  it("To check Manage Users Name header validation", () => {
    const facilityList: IFacilityToUser[] = [
      {
        activityStauts: 1,
        address1: "1800 17th Ave SE",
        address2: "",
        city: "San Antonio",
        facilityAddressID: "123",
        facilityName: "Home Health Agency",
        isSelected: true,
        isOriginalSelected: true,
        number: 1435657867,
        siteUseId: "12345",
        state: "TX",
        zipCode: "66554",
      },
    ];
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityToUser
          addBtnAction={() => {}}
          cancelBtnAction={() => {}}
          deselectAllBtnAction={() => {}}
          showSelectAllBtn={false}
          selectAllBtnAction={() => {}}
          facilities={facilityList}
          handleChange={() => {}}
          isAddBtnEnabled={false}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("add-facility-haeder");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Add Facility");
  });
});
