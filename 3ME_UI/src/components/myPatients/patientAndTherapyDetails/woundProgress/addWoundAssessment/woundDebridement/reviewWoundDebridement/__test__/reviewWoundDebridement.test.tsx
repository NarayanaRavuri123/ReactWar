import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../../../../util/ObjectFunctions";
import { newOrderWoundInfoTestData } from "../../../../../../../newOrder/newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import { IAddWoundAssessment } from "../../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../../addWoundAssessment.model";
import ReviewWoundDebridement from "../reviewWoundDebridement.component";
describe("Wound Assessment Bed component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Debridement header validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <ReviewWoundDebridement
        data={defaultValues}
        woundDebridementTypeCode={defaultValues}
      />
    );
    const title = screen.getByTestId("review-debridement-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Debridement");
  });
  it("Debridement Review Order component validate header edit button", () => {
    const defaultValues: IAddWoundAssessment = defaultAddWoundAssessment;
    render(
      <ReviewWoundDebridement
        data={defaultValues}
        woundDebridementTypeCode={defaultValues}
      />
    );
    const editBtn = screen.getByTestId("review-debridement-edit-button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
  });
});
