import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { newOrderWoundInfoTestData } from "../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import PreviousTherapy from "../previousTherapy.component";

describe("Previous Therapies component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Previous Therapies option validation", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PreviousTherapy woundInfoData={data} setWoundInfoData={mockSetState} />
      </MemoryRouter>
    );
    const salinegauze = screen.getByTestId("Saline Gauze");
    expect(salinegauze).toBeInTheDocument();
  });

  it("Previous Therapies Cause option validation", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PreviousTherapy woundInfoData={data} setWoundInfoData={mockSetState} />
      </MemoryRouter>
    );
    const comorbidities = screen.getByTestId("Presence of comorbidities");
    expect(comorbidities).toBeInTheDocument();
  });
});
