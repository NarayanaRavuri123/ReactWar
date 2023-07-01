import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../../../../util/ObjectFunctions";
import { newOrderWoundInfoTestData } from "../../../../../../../newOrder/newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import { IAddWoundAssessment } from "../../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../../addWoundAssessment.model";
import ReviewWoundMeasurementEschar from "../reviewWoundMeasurementEschar.component";

describe("Wound Eschar component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Wound Eschar header validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(<ReviewWoundMeasurementEschar data={defaultValues} />);
    const title = screen.getByTestId("review-woundEschar");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Eschar");
  });
  it("Eschar Review Order component validate header edit button", () => {
    const defaultValues: IAddWoundAssessment = defaultAddWoundAssessment;
    render(<ReviewWoundMeasurementEschar data={defaultValues} />);
    const editBtn = screen.getByTestId("review-woundEschar-edit-button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
  });
});
