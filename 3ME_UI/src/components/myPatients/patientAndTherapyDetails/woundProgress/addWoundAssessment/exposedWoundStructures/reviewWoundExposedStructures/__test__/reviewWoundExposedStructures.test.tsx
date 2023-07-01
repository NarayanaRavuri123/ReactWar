import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../../../../../util/ObjectFunctions";
import { mockExposedStructuresData } from "../../../../../../../newOrder/exposedStructures/exposedStructures.data";
import { IAddWoundAssessment } from "../../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../../addWoundAssessment.model";
import ReviewWoundExposedStructures from "../reviewWoundExposedStructures.component";
describe("Exposed Structures component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Exposed Structure header validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(<ReviewWoundExposedStructures data={defaultValues} />);
    const title = screen.getByTestId("review-expstr-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Exposed Structures");
  });
  it("Exposed Structure review order value validation", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.exposedStructures.value = mockExposedStructuresData;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ReviewWoundExposedStructures data={data} />
      </MemoryRouter>
    );

    const value = screen.getByTestId("review-expstr-val");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Subcutaneous Tissue, Tendon");
  });
});
