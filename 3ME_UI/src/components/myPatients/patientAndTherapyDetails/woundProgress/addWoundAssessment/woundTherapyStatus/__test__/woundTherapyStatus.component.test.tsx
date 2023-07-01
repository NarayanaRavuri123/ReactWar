import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import WoundTherapyStatus from "../woundTherapyStatus.component";

describe("Add Wound Assessment Therapy status components ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("WoundAssessment Therapy status title", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundTherapyStatus
          data={defaultValues}
          isTesting={true}
          setData={() => {}}
        />{" "}
        addWoundAssessment{" "}
      </MemoryRouter>
    );
    const title = screen.getByTestId("therapystatus-header");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Therapy Status")).toBeInTheDocument();
  });
  it("WoundAssessment Therapy status yes button", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundTherapyStatus
          data={defaultValues}
          isTesting={true}
          setData={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("therapystatus-yes");
    expect(title).toBeInTheDocument();
  });
  it("WoundAssessment Therapy status no button", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundTherapyStatus
          data={defaultValues}
          isTesting={true}
          setData={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("therapystatus-no");
    expect(title).toBeInTheDocument();
  });
});
