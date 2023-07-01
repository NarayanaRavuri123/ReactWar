import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";
import WoundMeasurementEschar from "../woundMeasurementEschar.component";

describe("Add Wound Assessment EscharComponent ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("WoundEschar status title", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundMeasurementEschar data={defaultValues} setData={() => {}} />{" "}
        addWoundAssessment{" "}
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundEschar-header");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Eschar")).toBeInTheDocument();
  });

  it("WoundEschar Eschar yes button", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundMeasurementEschar data={defaultValues} setData={() => {}} />{" "}
        addWoundAssessment{" "}
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundEscharStatus-yes");
    expect(title).toBeInTheDocument();
  });
  it("WoundEschar Eschar no button",() => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
        defaultAddWoundAssessment
      );
      render(
        <MemoryRouter initialEntries={["/"]}>
          <WoundMeasurementEschar data={defaultValues} setData={() => {}} />{" "}
          addWoundAssessment{" "}
        </MemoryRouter>
      );
      const title = screen.getByTestId("woundEscharStatus-no");
      expect(title).toBeInTheDocument();
    });
});
