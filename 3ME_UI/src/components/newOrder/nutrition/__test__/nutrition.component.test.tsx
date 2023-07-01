import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { NewOrderValidator } from "../../newOrder.validator";
import { newOrderWoundInfoTestData } from "../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import { Nutrition } from "../nutrition.component";

describe("Nutrition component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Nutrition label", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Nutrition woundInfoData={data} setWoundInfoData={mockSetState} />
      </MemoryRouter>
    );
    const label = screen.getByTestId("nutri-label");
    expect(label).toBeInTheDocument();
  });

  it("Nutrition compromised label", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Nutrition woundInfoData={data} setWoundInfoData={mockSetState} />
      </MemoryRouter>
    );
    const label = screen.getByTestId("nutri-status");
    expect(label).toBeInTheDocument();
  });

  it("Nutrition action checkboxes", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    const mockShowActions = jest.fn();
    React.useState = jest.fn().mockReturnValue([true, mockShowActions]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Nutrition woundInfoData={data} setWoundInfoData={mockSetState} />
      </MemoryRouter>
    );
    const label = screen.getByTestId("action-checkboxes");
    expect(label).toBeInTheDocument();
  });
});
