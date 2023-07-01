import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";
import WoundProvideAdditionalInfo from "../woundProvideAdditionalNote.component";

describe("Provide wound additional Info component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Provide additional Info title Validate", () => {
    const defaultvalues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    const mockSetState = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundProvideAdditionalInfo
          data={defaultvalues}
          setData={mockSetState}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("additionalWoundInfolabelTest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Additional Notes");
  });
});
