import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { newOrderWoundInfoTestData } from "../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import { Exudate } from "../exudate.component";

describe("Exudate component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Wound exudate header renders", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Exudate woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const header = screen.getByTestId("exudate-header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Wound Exudate");
  });
  it("Exudate amount dropdown renders", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Exudate woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const select = screen.getByTestId("exudate-amount-select");
    expect(select).toBeInTheDocument();
  });
  it("Exudate appearance dropdown renders", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.exudateAmount.value = "test";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Exudate woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const select = screen.getByTestId("exudate-appearance-select");
    expect(select).toBeInTheDocument();
  });
});
