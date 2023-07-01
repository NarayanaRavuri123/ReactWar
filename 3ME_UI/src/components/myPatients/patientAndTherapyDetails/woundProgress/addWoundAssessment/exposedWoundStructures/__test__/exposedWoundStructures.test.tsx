import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";
import { ExposedWoundStructures } from "../exposedWoundStructures.component";

describe("Exposed Structures component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Exposed wound structures header renders", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ExposedWoundStructures
          exposedWoundInfoData={defaultValues}
          setExposedWoundInfoData={() => {}}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("wound-exposed-header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Exposed Structures");
  });
  it("Exposed structures options renders", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ExposedWoundStructures
          exposedWoundInfoData={defaultValues}
          setExposedWoundInfoData={() => {}}
        />
      </MemoryRouter>
    );
    const option = screen.getByTestId("Muscle");
    expect(option).toBeInTheDocument();
  });
});
