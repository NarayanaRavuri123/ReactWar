import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import { IAddWoundAssessment } from "../../../../woundProgress/addWoundAssessment/addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../../../woundProgress/addWoundAssessment/addWoundAssessment.model";
import OrderOverviewReviewWoundUndermining from "../orderOverviewReviewWoundUndermining.component";

describe("Wound undermining  component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Wound undermining header validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(<OrderOverviewReviewWoundUndermining data={defaultValues} />);
    const title = screen.getByTestId("review-undermining");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Undermining");
  });
  it("Wound undermining Review Order component validate header edit button", () => {
    const defaultValues: IAddWoundAssessment = defaultAddWoundAssessment;
    render(<OrderOverviewReviewWoundUndermining data={defaultValues} />);
    const editBtn = screen.getByTestId("review-woundUndermining-edit-button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
  });
});
