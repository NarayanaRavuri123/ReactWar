import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../../../../util/ObjectFunctions";
import { IAddWoundAssessment } from "../../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../../addWoundAssessment.model";
import ReviewWoundAssessor from "../reviewWoundAssessor.component";
describe("Wound Assessor  component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Wound Assessor header validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(<ReviewWoundAssessor data={defaultValues} />);
    const title = screen.getByTestId("review-woundAssessor");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Assessor");
  });
  it("Wound Assessor Review Order component validate header edit button", () => {
    const defaultValues: IAddWoundAssessment = defaultAddWoundAssessment;
    render(<ReviewWoundAssessor data={defaultValues} />);
    const editBtn = screen.getByTestId("review-woundAssessor-edit-button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
  });
});
