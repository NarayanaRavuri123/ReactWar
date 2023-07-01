import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { IPermissionData } from "../../../../RolesPermission/RolesPermission.model";
import { woundAssessmentAttest } from "../../../../components/myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundReviewAssessment/attestationAndSignature.model";
import { RolesPermissionContext } from "../../../../context/RolesPermissionContext";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import AttestationAndSignature from "../../attestationAndSignature.component";
import AttestationAndSignatureSummary from "../attestationAndSignatureSummary.component";

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
  IsShowAddWoundAssessmentMenu: false,
};

describe("Attestation and Signature Summary component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Attestation and Signature Summary component Present", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AttestationAndSignatureSummary attestationData={attestationData} />
      </MemoryRouter>
    );
    const component = screen.getByTestId("attest-summary-container");
    expect(component).toBeInTheDocument();
  });
  it("Attestation and Signature summary title", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AttestationAndSignatureSummary attestationData={attestationData} />
      </MemoryRouter>
    );
    const component = screen.getByTestId("attest-summary-title");
    expect(component).toBeInTheDocument();
  });
  it("Attestation and Signature summary non sales name field", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AttestationAndSignatureSummary attestationData={attestationData} />
      </MemoryRouter>
    );
    const component = screen.getByTestId("attest-summary-non-sales-name");
    expect(component).toBeInTheDocument();
  });
  it("Attestation and Signature summary non sales attestation date", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AttestationAndSignatureSummary attestationData={attestationData} />
      </MemoryRouter>
    );
    const component = screen.getByTestId("attest-summary-non-sales-date");
    expect(component).toBeInTheDocument();
  });
  it("Attestation and Signature summary sales firstLastName", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AttestationAndSignatureSummary attestationData={attestationData} />
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("summary-woundAssessment-sales-info");
    expect(component).toBeInTheDocument();
  });
  it("Attestation and Signature summary sales confirmation date", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AttestationAndSignatureSummary attestationData={attestationData} />
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("confirmation-date");
    expect(component).toBeInTheDocument();
  });
  it("Attestation and Signature summary sales e-signature", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AttestationAndSignatureSummary attestationData={attestationData} />
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("e-signature");
    expect(component).toBeInTheDocument();
  });
  it("Attestation and Signature summary sales electronic date stamp", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AttestationAndSignatureSummary attestationData={attestationData} />
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("electronic-date-stamp");
    expect(component).toBeInTheDocument();
  });
});
