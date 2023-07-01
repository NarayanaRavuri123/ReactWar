import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WoundMeasurement from "../woundMeasurement.component";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
describe("Add Wound Assessment Wound Measurement Component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("WoundAssessment Wound Measurement title", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundMeasurement data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundMeasure-header");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Wound Measurements")).toBeInTheDocument();
  });
  it("WoundAssessment Wound Measurement date", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    defaultValues.woundTherapyStatus.value = "no";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundMeasurement data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundMeasuretitleid");
    expect(title).toBeInTheDocument();
    expect(
      screen.getByText("Have measurements been taken?")
    ).toBeInTheDocument();
  });
});
