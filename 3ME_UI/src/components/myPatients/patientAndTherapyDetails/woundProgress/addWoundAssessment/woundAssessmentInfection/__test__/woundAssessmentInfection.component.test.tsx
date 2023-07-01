import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WoundAssessmentInfection from "../woundAssessmentInfection.component";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";
import InfectionTypes from "../InfectionTypes/InfectionTypes.component";
import TreatmentRegimen from "../treatmentRegimen/treatmentRegimen.component";

describe("Wound Assessment Infection component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Wound Assessment Infection component Title validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessmentInfection data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundAssess-infection-header");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Infection")).toBeInTheDocument();
  });

  it("Wound Assessment Infection component Desp validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessmentInfection data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundAssess-infection-desp");
    expect(title).toBeInTheDocument();
    expect(
      screen.getByText("Has there been infection present in the last 30 days?")
    ).toBeInTheDocument();
  });
  it("Wound Assessment Infection component Radio Yes validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessmentInfection data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundAssess-infection-yes");
    expect(title).toBeInTheDocument();
  });
  it("Wound Assessment Infection component Radio No validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessmentInfection data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundAssess-infection-no");
    expect(title).toBeInTheDocument();
  });
  it("Wound Assessment Infection types validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InfectionTypes data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("radioTitleID");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Type of infection")).toBeInTheDocument();
  });
  it("Wound Assessment Infection treatment Regimin validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TreatmentRegimen data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("treatment-regimen-header");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Indicate Treatment Regimen")).toBeInTheDocument();
  });
});
