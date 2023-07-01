import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";
import WoundAssessor from "../woundAssessor.component";

describe("Add wound Assessment WoundAssessor component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("WoundAssessment WoundAssessor title", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessor data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const header = screen.getByTestId("Assessor-header").textContent;
    expect(header).toBe(`Wound Assessor`);
  });
  it("WoundAssessment WoundAssessor name to be presented", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessor data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundAssessorStatustitleId");
    expect(title).toBeInTheDocument();
    expect(
      screen.getByText(
        "Did someone other than yourself perform this assessment?"
      )
    ).toBeInTheDocument();
  });
});
