import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../../../../util/ObjectFunctions";
import { newOrderWoundInfoTestData } from "../../../../../../../newOrder/newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import { IAddWoundAssessment } from "../../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../../addWoundAssessment.model";
import ReviewWoundUndermining from "../reviewWoundUndermining.component";
describe("Wound undermining  component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Wound undermining header validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(<ReviewWoundUndermining data={defaultValues} />);
    const title = screen.getByTestId("review-undermining");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Undermining");
  });
  it("Wound undermining Review Order component validate header edit button", () => {
    const defaultValues: IAddWoundAssessment = defaultAddWoundAssessment;
    render(<ReviewWoundUndermining data={defaultValues} />);
    const editBtn = screen.getByTestId("review-woundUndermining-edit-button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
  });
});
