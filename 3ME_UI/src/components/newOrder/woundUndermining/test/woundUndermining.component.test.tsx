import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { newOrderWoundInfoTestData } from "../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import WoundUndermining from "../woundUndermining.component";
import UnderminingDetails from "../woundUnderminingDetails/underminingDetails.component";

describe("Wound Undermining component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Wound Undermining validate title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundUndermining woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("undermining-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Undermining");
  });

  it("Wound Undermining desp validate title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundUndermining woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundUndermining-desp");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Is undermining present in the wound?");
  });

  it("Wound undermining present? no button", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundUndermining woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const noButton = screen.getByTestId("woundUndermining-No");
    expect(noButton).toBeInTheDocument();
    expect(noButton).not.toBeChecked();
  });

  it("Wound Undermining present? yes button", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundUndermining woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const noButton = screen.getByTestId("woundUndermining-Yes");
    expect(noButton).toBeInTheDocument();
    expect(noButton).not.toBeChecked();
  });

  it("Wound Undermining details o’clock present?", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UnderminingDetails woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("underminingoclock");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("o’clock");
  });
  it("Wound Undermining details to present?", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UnderminingDetails woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("undermining-totest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("to");
  });
  it("Wound Undermining details from present?", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UnderminingDetails woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("undermining-fromtest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("from");
  });
});
