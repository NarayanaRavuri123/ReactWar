import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AttestationAndSignature from "../attestationAndSignature.component";
import { getDeepClone } from "../../../util/ObjectFunctions";
import { woundAssessmentAttest } from "../../../components/myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundReviewAssessment/attestationAndSignature.model";
import { RolesPermissionContext } from "../../../context/RolesPermissionContext";
import { IPermissionData } from "../../../RolesPermission/RolesPermission.model";

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

describe("Attestation and Signature component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Attestation and Signature component Present", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AttestationAndSignature
          attestationData={attestationData}
          setAttestationData={() => {}}
        />
      </MemoryRouter>
    );
    const component = screen.getByTestId("attest-container");
    expect(component).toBeInTheDocument();
  });
  it("Attestation and Signature component title", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AttestationAndSignature
          attestationData={attestationData}
          setAttestationData={() => {}}
        />
      </MemoryRouter>
    );
    const component = screen.getByTestId("attest-title");
    expect(component).toBeInTheDocument();
  });
  it("Attestation and Signature component non sales", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AttestationAndSignature
          attestationData={attestationData}
          setAttestationData={() => {}}
        />
      </MemoryRouter>
    );
    const component = screen.getByTestId("attest-sale-desp-nonsale");
    expect(component).toBeInTheDocument();
  });
  it("Attestation and Signature component non sales name field", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AttestationAndSignature
          attestationData={attestationData}
          setAttestationData={() => {}}
        />
      </MemoryRouter>
    );
    const component = screen.getByTestId("formControl-attest-your-Name");
    expect(component).toBeInTheDocument();
  });
  it("Attestation and Signature component non sales attestation date", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AttestationAndSignature
          attestationData={attestationData}
          setAttestationData={() => {}}
        />
      </MemoryRouter>
    );
    const component = screen.getByTestId("attestationDate");
    expect(component).toBeInTheDocument();
  });
  it("Attestation and Signature component sales block", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AttestationAndSignature
            attestationData={attestationData}
            setAttestationData={() => {}}
          />
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("attest-sale-desp-sale");
    expect(component).toBeInTheDocument();
  });
  it("Attestation and Signature component sales firstLastName", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AttestationAndSignature
            attestationData={attestationData}
            setAttestationData={() => {}}
          />
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("formControl-firstLastNameID");
    expect(component).toBeInTheDocument();
  });
  it("Attestation and Signature component sales employer", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AttestationAndSignature
            attestationData={attestationData}
            setAttestationData={() => {}}
          />
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("formControl-employerid");
    expect(component).toBeInTheDocument();
  });
  it("Attestation and Signature component sales phone number", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AttestationAndSignature
            attestationData={attestationData}
            setAttestationData={() => {}}
          />
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("formControl-phonenumberid");
    expect(component).toBeInTheDocument();
  });
  it("Attestation and Signature component sales confirmation date", () => {
    let attestationData = getDeepClone(woundAssessmentAttest);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AttestationAndSignature
            attestationData={attestationData}
            setAttestationData={() => {}}
          />
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("formControl-confirmationdateid");
    expect(component).toBeInTheDocument();
  });
});
