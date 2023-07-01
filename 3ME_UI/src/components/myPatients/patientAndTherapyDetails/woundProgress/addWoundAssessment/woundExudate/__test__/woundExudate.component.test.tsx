import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";
import { WoundExudate } from "../woundExudate.component";

describe("Wound Exudate component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Wound exudate title", () => {
    const data: IAddWoundAssessment = getDeepClone(defaultAddWoundAssessment);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundExudate data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const header = screen.getByTestId("wound-exudate-header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Wound Exudate");
  });
  it("Exudate Amount header", () => {
    const data: IAddWoundAssessment = getDeepClone(defaultAddWoundAssessment);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundExudate data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const header = screen.getByTestId("wound-exudate-amount");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Exudate Amount");
  });
  it("Exudate amount dropdown", () => {
    const data: IAddWoundAssessment = getDeepClone(defaultAddWoundAssessment);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundExudate data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const select = screen.getByTestId("wound-exudate-amount-select");
    expect(select).toBeInTheDocument();
  });
});
