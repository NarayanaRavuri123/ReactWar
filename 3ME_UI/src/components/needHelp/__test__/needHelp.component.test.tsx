import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RolesPermissionContext } from "../../../context/RolesPermissionContext";
import { IPermissionData } from "../../../RolesPermission/RolesPermission.model";
import {
  USER_ROLE_BASE,
  USER_ROLE_CLINICIAN,
} from "../../../util/PermissionName";
import { PageContext } from "../../page/page.context";
import { NeedHelp } from "../needHelp.component";
import { ISalesRep, ITechnicalSupport } from "../needHelp.interface";

export let defaultTestPermissionDataModel: IPermissionData = {
  IsShowStartNewOrder: true,
  IsShowSupplyOrderButton: true,
  IsShowVacOrderButton: true,
  IsShowInventoryOption: false,
  IsShowAdminstrationOption: false,
  IsSupportRole: false,
  IsSalesRole: true,
  IsSalesManagerRole: false,
  IsFacilityAdminRole: false,
  IsClinicianRole: false,
  IsBaseRole: false,
  Is3MAdminRole: false,
  IsProdManagerRole: false,
  IsAdminFacilitySettingsButton: false,
  IsAdminFacilityUsersButton: false,
  IsAdminMyListsButton: false,
  IsAdminRolesPermissionButton: false,
  IsAdminUserAccounts: false,
  IsShowManageAccountMenu: false,
  IsPrdMgrSiteStatus: false,
  IsSalesRepDetails: true,
  IsShowAddWoundAssessmentMenu: false,
};

describe("Help and support component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Need help? when not logged In", () => {
    const saleRepData: ISalesRep = {
      emailAddress: "vmmcgehee@mmm.com",
      phoneNo: "+1 (607) 727-9138",
      name: "VANESSA MCGEHEE",
    };
    const techSupportData: ITechnicalSupport = {
      emailAddress: "kciexpress@kci1.com",
      phoneNo: "1-800-275-4524 ext 41858",
    };
    render(
      <PageContext.Provider
        value={{
          salesRepContacts: saleRepData,
          techRepContacts: techSupportData,
        }}
      >
        <NeedHelp
          isLoggedIn={true}
          userRole={USER_ROLE_CLINICIAN}
          isFromHelpSupport={false}
        />
      </PageContext.Provider>
    );
    expect(screen.getByText("Need help?")).toBeTruthy();
    expect(screen.getByText("Technical Support")).toBeInTheDocument();
    expect(screen.getByTestId("phone1")).toBeInTheDocument();
    expect(screen.getByText("1-800-275-4524 ext 41858")).toBeInTheDocument();
    expect(screen.getByTestId("email1")).toBeInTheDocument();
    expect(screen.getByText("kciexpress@kci1.com")).toBeInTheDocument();
  });

  it("Need help? when logged In", () => {
    const saleRepData: ISalesRep = {
      emailAddress: "vmmcgehee@mmm.com",
      phoneNo: "+1 (607) 727-9138",
      name: "VANESSA MCGEHEE",
    };
    const techSupportData: ITechnicalSupport = {
      emailAddress: "kciexpress@kci1.com",
      phoneNo: "1-800-275-4524 ext 41858",
    };
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PageContext.Provider
          value={{
            salesRepContacts: saleRepData,
            techRepContacts: techSupportData,
          }}
        >
          <RolesPermissionContext.Provider
            value={{
              mappedRolesPermissionData: defaultTestPermissionDataModel,
              setMappedRolesPermissionData: () => {},
            }}
          >
            <NeedHelp
              isLoggedIn={true}
              userRole={USER_ROLE_CLINICIAN}
              isFromHelpSupport={false}
            />
          </RolesPermissionContext.Provider>
        </PageContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Need help?")).toBeTruthy();
    expect(screen.getByText("Technical Support")).toBeInTheDocument();
    expect(screen.getByTestId("phone1")).toBeInTheDocument();
    expect(screen.getByText("1-800-275-4524 ext 41858")).toBeInTheDocument();
    expect(screen.getByTestId("email1")).toBeInTheDocument();
    expect(screen.getByText("vmmcgehee@mmm.com")).toBeInTheDocument();
    expect(screen.getByText("Post Acute Sales Rep")).toBeInTheDocument();
    expect(screen.getByText("VANESSA MCGEHEE")).toBeInTheDocument();
    expect(screen.getByTestId("phone2")).toBeInTheDocument();
    expect(screen.getByText("+1 (607) 727-9138")).toBeInTheDocument();
  });
});
