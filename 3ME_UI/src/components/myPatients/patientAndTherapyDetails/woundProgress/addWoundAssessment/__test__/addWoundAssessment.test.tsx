import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddWoundAssessment from "../addWoundAssessment.component";
import { getDeepClone } from "../../../../../../util/ObjectFunctions";
import { defaultAddWoundAssessment } from "../addWoundAssessment.model";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import AddWoundFooterButtonGroup from "../addWoundFooterButtonGroup/addWoundFooterButtonGroup.component";
import { WoundAssessmentContext } from "../../../../../../context/WoundAssessmentContext";
import { mockWoundAssessmentData } from "./mockAddWoundAssessmentContext";
import userEvent from "@testing-library/user-event";
import React from "react";
import { IPermissionData } from "../../../../../../RolesPermission/RolesPermission.model";
import { RolesPermissionContext } from "../../../../../../context/RolesPermissionContext";
jest.mock("../../../../../../core/resuablePopup/reusablePopUp.component");
export let defaultTestPermissionDataModel: IPermissionData = {
  IsShowStartNewOrder: false,
  IsShowSupplyOrderButton: false,
  IsShowVacOrderButton: false,
  IsShowInventoryOption: false,
  IsShowAdminstrationOption: false,
  IsSupportRole: true,
  IsSalesRole: false,
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
  IsShowAddWoundAssessmentMenu: true,
};

describe("Add Wound Assessment components ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("WoundAssessment Error message validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddWoundAssessment
          data={defaultValues}
          isErrorOccurred={true}
          isTesting={true}
          setData={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("error-text-wound");
    expect(title).toBeInTheDocument();
    expect(
      screen.getByText("Oops Something Went Wrong !!")
    ).toBeInTheDocument();
  });
  it("WoundAssessment patient name placeholder", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddWoundAssessment
          data={defaultValues}
          isErrorOccurred={false}
          isTesting={true}
          setData={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("addWound-PatientName-id");
    expect(title).toBeInTheDocument();
  });
  it("WoundAssessment wound location placeholder", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddWoundAssessment
          data={defaultValues}
          isErrorOccurred={false}
          isTesting={true}
          setData={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("addWound-WoundDetail-id");
    expect(title).toBeInTheDocument();
  });
  it("WoundAssessment wound type placeholder", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddWoundAssessment
          data={defaultValues}
          isErrorOccurred={false}
          isTesting={true}
          setData={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("addWound-WoundType-id");
    expect(title).toBeInTheDocument();
  });
  it("WoundAssessment dob placeholder", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddWoundAssessment
          data={defaultValues}
          isErrorOccurred={false}
          isTesting={true}
          setData={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("addWound-dob-id");
    expect(title).toBeInTheDocument();
  });
  it("WoundAssessment ron placeholder", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddWoundAssessment
          data={defaultValues}
          isErrorOccurred={false}
          isTesting={true}
          setData={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("addWound-ro-id");
    expect(title).toBeInTheDocument();
  });

  it("Delete Button present", async () => {
    const openDeletePop = jest.fn();
    render(
      <WoundAssessmentContext.Provider
        value={{
          ...mockWoundAssessmentData(),
        }}
      >
        <MemoryRouter initialEntries={["/"]}>
          <AddWoundFooterButtonGroup
            openDeletePop={openDeletePop}
            deleteHandler={() => {}}
            callSaveWoundAssessmentOrder={() => {}}
            errorFlag={false}
            errorMessage=""
            saveWoundAssessmentLoader={false}
            setErrorFlag={() => {}}
            setSaveWoundAssessmentLoader={() => {}}
          />
        </MemoryRouter>
      </WoundAssessmentContext.Provider>
    );
    const deleteBtn = screen.getByTestId("deleteOrderClass");
    expect(deleteBtn).toBeInTheDocument();
    expect(deleteBtn).toHaveTextContent("Delete");
    userEvent.click(deleteBtn);
    expect(openDeletePop).toBeCalledTimes(1);
  });

  it("Previous Button present", () => {
    const previousPagefuntion = jest.fn();
    render(
      <WoundAssessmentContext.Provider
        value={{
          ...mockWoundAssessmentData(),
        }}
      >
        <MemoryRouter initialEntries={["/"]}>
          <AddWoundFooterButtonGroup
            deleteHandler={() => {}}
            previousHandler={previousPagefuntion}
            callSaveWoundAssessmentOrder={() => {}}
            errorFlag={false}
            errorMessage=""
            saveWoundAssessmentLoader={false}
            setErrorFlag={() => {}}
            setSaveWoundAssessmentLoader={() => {}}
          />
        </MemoryRouter>
      </WoundAssessmentContext.Provider>
    );
    const previousButton = screen.getByTestId("prevOrderTest");
    expect(previousButton).toBeInTheDocument();
    expect(previousButton).toHaveTextContent("Previous");
    userEvent.click(previousButton);
    expect(previousPagefuntion).toBeCalledTimes(1);
  });
  it("Delete Button disabled when support role  present", async () => {
    const openDeletePop = jest.fn();
    render(
      <WoundAssessmentContext.Provider
        value={{
          ...mockWoundAssessmentData(),
        }}
      >
        <MemoryRouter initialEntries={["/"]}>
          <AddWoundFooterButtonGroup
            openDeletePop={openDeletePop}
            deleteHandler={() => {}}
            callSaveWoundAssessmentOrder={() => {}}
            errorFlag={false}
            errorMessage=""
            saveWoundAssessmentLoader={false}
            setErrorFlag={() => {}}
            setSaveWoundAssessmentLoader={() => {}}
          />
          <RolesPermissionContext.Provider
            value={{
              mappedRolesPermissionData: defaultTestPermissionDataModel,
              setMappedRolesPermissionData: () => {},
            }}
          ></RolesPermissionContext.Provider>
        </MemoryRouter>
      </WoundAssessmentContext.Provider>
    );
    const dltBtn = screen.getByTestId("deleteOrderClass");
    expect(dltBtn).not.toBeInTheDocument;
  });
  it("Review Assessment Button disabled when support role  present", async () => {
    const openDeletePop = jest.fn();
    render(
      <WoundAssessmentContext.Provider
        value={{
          ...mockWoundAssessmentData(),
        }}
      >
        <MemoryRouter initialEntries={["/"]}>
          <AddWoundFooterButtonGroup
            openDeletePop={openDeletePop}
            deleteHandler={() => {}}
            callSaveWoundAssessmentOrder={() => {}}
            errorFlag={false}
            errorMessage=""
            saveWoundAssessmentLoader={false}
            setErrorFlag={() => {}}
            setSaveWoundAssessmentLoader={() => {}}
          />
          <RolesPermissionContext.Provider
            value={{
              mappedRolesPermissionData: defaultTestPermissionDataModel,
              setMappedRolesPermissionData: () => {},
            }}
          ></RolesPermissionContext.Provider>
        </MemoryRouter>
      </WoundAssessmentContext.Provider>
    );
    const reviewBtn = screen.getByTestId("reviewOrderClass");
    expect(reviewBtn).not.toBeInTheDocument;
  });
});
