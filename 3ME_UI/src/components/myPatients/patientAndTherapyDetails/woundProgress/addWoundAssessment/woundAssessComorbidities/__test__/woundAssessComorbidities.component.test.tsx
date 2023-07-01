import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";
import WoundAssessComorbidities from "../woundAssessComorbidities.component";

describe("Wound Assessment Commorbodities component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Wound Assessment Commorbodities component header renders", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessComorbidities data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const header = screen.getByTestId("assesscomorbidities-title");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Comorbidities");
  });
  it("Wound Assessment Commorbodities component title renders", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessComorbidities data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const header = screen.getByTestId("assesscomorbidities-header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(
      "Which of the following comorbidities apply?"
    );
  });
  it("Wound Assessment Commorbodities component validate Diabetes Mellitus (DM) option", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessComorbidities data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const header = screen.getByTestId("Diabetes Mellitus (DM)");
    expect(header).toBeInTheDocument();
  });
  it("Wound Assessment Commorbodities component validate End-Stage Renal Disease (ESRD) option", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessComorbidities data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const header = screen.getByTestId("End-Stage Renal Disease (ESRD)");
    expect(header).toBeInTheDocument();
  });
  it("Wound Assessment Commorbodities component validate Peripheral vascular disease (PVD) option", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessComorbidities data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const header = screen.getByTestId("Peripheral vascular disease (PVD)");
    expect(header).toBeInTheDocument();
  });
  it("Wound Assessment Commorbodities component validate Peripheral arterial disease (PAD) option", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessComorbidities data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const header = screen.getByTestId("Peripheral arterial disease (PAD)");
    expect(header).toBeInTheDocument();
  });
});
