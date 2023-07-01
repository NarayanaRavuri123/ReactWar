import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WoundAssessmentDateRange from "../woundAssessmentDateRange.component";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";

describe("Add Wound Assessment date range components ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("WoundAssessment date range div", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessmentDateRange data={defaultValues} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundAssess-header");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Wound Assessment Date Range")).toBeInTheDocument();
  });
  it("WoundAssessment date range values", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessmentDateRange data={defaultValues} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundAssess-dates");
    expect(title).toBeInTheDocument();
  });
});
