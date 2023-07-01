import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { newOrderWoundInfoTestData } from "../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import WoundBed from "../woundBed.component";

describe("WoundBed component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("WoundBed Title Present", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundBed woundInfoData={data} setWoundInfoData={mockSetState} />
      </MemoryRouter>
    );
    const Diabetes = screen.getByTestId("woundBedTitleTest");
    expect(Diabetes).toBeInTheDocument();
  });

  it("WoundBed ToolTip Present", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundBed woundInfoData={data} setWoundInfoData={mockSetState} />
      </MemoryRouter>
    );
    const other = screen.getByTestId("woundBedTooltipTest");
    expect(other).toBeInTheDocument();
  });

  it("WoundBed Percent Present", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundBed woundInfoData={data} setWoundInfoData={mockSetState} />
      </MemoryRouter>
    );
    const other = screen.getByTestId("woundBedPercentTest");
    expect(other).toBeInTheDocument();
  });
});
