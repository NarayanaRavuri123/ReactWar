import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { newOrderWoundInfoTestData } from "../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import Comorbodities from "../comorbodities.component";

describe("Comorbodities component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Comorbodities option validation", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Comorbodities woundInfoData={data} setWoundInfoData={mockSetState} />
      </MemoryRouter>
    );
    const Diabetes = screen.getByTestId("Diabetes");
    expect(Diabetes).toBeInTheDocument();
  });

  it("Comorbodities option validation 1", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Comorbodities woundInfoData={data} setWoundInfoData={mockSetState} />
      </MemoryRouter>
    );
    const other = screen.getByTestId("Other");
    expect(other).toBeInTheDocument();
  });
});
