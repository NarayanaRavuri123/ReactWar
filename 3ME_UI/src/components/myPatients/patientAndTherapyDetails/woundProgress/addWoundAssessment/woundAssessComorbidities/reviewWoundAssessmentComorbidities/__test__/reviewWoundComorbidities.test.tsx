import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../../../../util/ObjectFunctions";
import { mockComorbiditiesData } from "../../../../../../../newOrder/comorbodities/comorbodities.data";
import { IAddWoundAssessment } from "../../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../../addWoundAssessment.model";
import ReviewWoundComorbidities from "../reviewWoundAssessmentComorbidities.component";
describe("Comorbidities component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Comorbidities header validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(<ReviewWoundComorbidities data={defaultValues} />);
    const title = screen.getByTestId("review-comobidities-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Comorbidities");
  });
  it("To check Comorbidities title validation", () => {
    const defaultValues: IAddWoundAssessment = defaultAddWoundAssessment;
    render(<ReviewWoundComorbidities data={defaultValues} />);
    const title = screen.getByTestId("review-woundComorbidities-value");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Applicable comorbidities");
  });
  it("Comorbidities Review Order component validate header edit button", () => {
    const defaultValues: IAddWoundAssessment = defaultAddWoundAssessment;
    render(<ReviewWoundComorbidities data={defaultValues} />);
    const editBtn = screen.getByTestId("review-woundComorbidities-edit-button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
  });
  it("Comorbidities Review Order component validate applicable comorbidities", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.woundAssessComorbodities.value = mockComorbiditiesData;

    render(<ReviewWoundComorbidities data={data} />);

    const element = screen.getByTestId("review-woundComorbidities-value");
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Immobility");
  });
});
