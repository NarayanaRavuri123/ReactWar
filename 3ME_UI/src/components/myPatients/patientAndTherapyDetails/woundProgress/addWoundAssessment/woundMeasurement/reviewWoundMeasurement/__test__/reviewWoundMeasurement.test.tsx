import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../../../../util/ObjectFunctions";
import { newOrderWoundInfoTestData } from "../../../../../../../newOrder/newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import { IAddWoundAssessment } from "../../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../../addWoundAssessment.model";
import ReviewWoundMeasurement from "../reviewWoundMeasurement.component";
describe("Wound Measurement component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Wound Measurement header validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(<ReviewWoundMeasurement data={defaultValues} />);
    const title = screen.getByTestId("review-woundMeasure");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Measurements");
  });
  it("Wound Measurement Review Order component validate header edit button", () => {
    const defaultValues: IAddWoundAssessment = defaultAddWoundAssessment;
    render(<ReviewWoundMeasurement data={defaultValues} />);
    const editBtn = screen.getByTestId("review-woundMeasure-edit-button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
  });
});
