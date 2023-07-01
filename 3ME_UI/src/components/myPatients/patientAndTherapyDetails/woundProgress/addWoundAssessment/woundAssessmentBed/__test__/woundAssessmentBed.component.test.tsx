import * as React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { WoundAssessmentBed } from "../woundAssessmentBed.component";

describe("Validate Assessment Wound Bed component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate Holds and Hospitalization component title", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessmentBed data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("assess-woundBedTitleTest");
    expect(title).toBeInTheDocument();
  });
  it("WoundBed ToolTip Present", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessmentBed data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const other = screen.getByTestId("assess-woundBedTooltipTest");
    expect(other).toBeInTheDocument();
  });

  it("WoundBed Percent Present", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessmentBed data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const other = screen.getByTestId("assess-woundBedPercentTest");
    expect(other).toBeInTheDocument();
  });
});
