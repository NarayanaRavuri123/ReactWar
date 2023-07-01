import { MemoryRouter } from "react-router-dom";
import Debridement from "../debridement.component";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { cleanup, render, screen } from "@testing-library/react";
import { newOrderWoundInfoTestData } from "../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";

describe("Debridement component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Debridement validate title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Debridement woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("debridement-cause-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Debridement");
  });

  it("Debridement desp validate title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Debridement woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("debridement-desp");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Has debridement been attempted in the last 10 days"
    );
  });

  it("Has debridement been attempted in the last 10 days? yes button", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Debridement woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const yesButton = screen.getByTestId("debridement-attempt-Yes");
    expect(yesButton).toBeInTheDocument();
    expect(yesButton).not.toBeChecked();
  });

  it("Has debridement been attempted in the last 10 days? no button", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Debridement woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const noButton = screen.getByTestId("debridement-attempt-No");
    expect(noButton).toBeInTheDocument();
    expect(noButton).not.toBeChecked();
  });

  it("Debridement required text validate title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Debridement woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("debridement-required");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Are serial debridements required?*");
  });
});
