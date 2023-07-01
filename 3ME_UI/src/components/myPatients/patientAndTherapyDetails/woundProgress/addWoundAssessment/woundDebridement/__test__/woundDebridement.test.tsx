import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import { Validator } from "../../../../../../../util/order.validations";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";
import { AddWoundAssessmentValidator } from "../../addWoundAssessment.validator";
import WoundDebridement from "../woundDebridement.component";

describe("Add Wound Assessment DebridementComponent ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("WoundDebridement status title", () => {
    const Validator = new AddWoundAssessmentValidator();
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IAddWoundAssessment) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundDebridement
          data={defaultValues}
          setData={mockSetState}
          debridementTypeHeading="Was wound recently debrided?"
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundDebridement-header");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Debridement")).toBeInTheDocument();
  });
  it("WoundDebridement  yes button", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IAddWoundAssessment) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundDebridement
          data={defaultValues}
          setData={() => {}}
          debridementTypeHeading="Was wound recently debrided?"
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundDebridementStatus-yes");
    expect(title).toBeInTheDocument();
  });
  it("WoundDebridement  no button", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IAddWoundAssessment) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundDebridement
          data={defaultValues}
          setData={() => {}}
          debridementTypeHeading="Was wound recently debrided?"
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundDebridementStatus-no");
    expect(title).toBeInTheDocument();
  });
});
