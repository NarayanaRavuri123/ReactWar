import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../../../../util/ObjectFunctions";
import { IAddWoundAssessment } from "../../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../../addWoundAssessment.model";
import ReviewHoldOrHospitalization from "../reviewHoldOrHospitalization.component";

describe("Hold Or Hospitalisation component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Hold Or Hospitalisation header validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(<ReviewHoldOrHospitalization data={defaultValues} />);
    const title = screen.getByTestId("review-holdOrHospital");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Holds and Hospitalizations");
  });
  it("Hold Or Hospitalisation Review Order component validate header edit button", () => {
    const defaultValues: IAddWoundAssessment = defaultAddWoundAssessment;
    render(<ReviewHoldOrHospitalization data={defaultValues} />);
    const editBtn = screen.getByTestId("review-holdOrHospital-edit-button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
  });
});
