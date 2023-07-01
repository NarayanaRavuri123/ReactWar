import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../../../../util/ObjectFunctions";
import { IAddWoundAssessment } from "../../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../../addWoundAssessment.model";
import ReviewWoundAssessmentInfection from "../reviewWoundAssessmentInfection.component";

describe("Wound Assessment Infection component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Wound Infection header validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(<ReviewWoundAssessmentInfection data={defaultValues} />);
    const title = screen.getByTestId("review-woundInfection");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Infection");
  });
  it("Wound Infection Review Order component validate header edit button", () => {
    const defaultValues: IAddWoundAssessment = defaultAddWoundAssessment;
    render(<ReviewWoundAssessmentInfection data={defaultValues} />);
    const editBtn = screen.getByTestId("review-woundInfection-edit-button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
  });
});
