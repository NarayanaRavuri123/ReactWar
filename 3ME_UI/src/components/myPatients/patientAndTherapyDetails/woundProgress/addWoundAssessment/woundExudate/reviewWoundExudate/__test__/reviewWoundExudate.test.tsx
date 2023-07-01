import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../../../../util/ObjectFunctions";
import { newOrderWoundInfoTestData } from "../../../../../../../newOrder/newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import { IAddWoundAssessment } from "../../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../../addWoundAssessment.model";
import ReviewWoundExudate from "../reviewWoundExudate.component";
describe("Wound Exudate component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Wound Exudate header validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <ReviewWoundExudate
        data={defaultValues}
        exudateAppearanceData={defaultValues}
        exudateAmountData={defaultValues}
      />
    );
    const title = screen.getByTestId("review-woundExudate-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Exudate");
  });
  it("Exudate Review Order component validate header edit button", () => {
    const defaultValues: IAddWoundAssessment = defaultAddWoundAssessment;
    render(
      <ReviewWoundExudate
        data={defaultValues}
        exudateAppearanceData={defaultValues}
        exudateAmountData={defaultValues}
      />
    );
    const editBtn = screen.getByTestId("review-woundExudate-edit-button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
  });
  it("Exudate Review Order component validate debridement attempted as yes", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.exudateAmount.value = "Test";
    render(
      <ReviewWoundExudate
        data={data}
        exudateAppearanceData={data}
        exudateAmountData={data}
      />
    );
    const title = screen.getByTestId("review-woundExudate-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Exudate");
    const value = screen.getByTestId("review-woundExudate-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Test");
  });
  it("Exudate Review Order component validate debridement attempted as yes", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.exudateAppearance.value = "Test";
    render(
      <ReviewWoundExudate
        data={data}
        exudateAppearanceData={data}
        exudateAmountData={data}
      />
    );
    const title = screen.getByTestId("review-woundExudate-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Exudate Appearence");
    const value = screen.getByTestId("review-woundExudate-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Test");
  });
});
