import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { newOrderWoundInfoTestData } from "../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import WoundDimension from "../woundDimension.component";
import WoundMeasurement from "../woundMeasurementDetails/woundMeasurement.component";

describe("Wound Dimension component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Wound Dimension validate title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundDimension woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("dimension-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Dimensions");
  });

  it("Wound Dimension date validate title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundDimension woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundMeasurementDate-date-id");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Measurement Date");
  });

  it("Wound Dimension thickness present title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundDimension woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("dimension-desp");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Is the wound full thickness?");
  });

  it("Wound Dimension length present title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundMeasurement woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundLength-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Length (cm)");
  });

  it("Wound Dimension width present title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundMeasurement woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundWidth-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Width (cm)");
  });

  it("Wound Dimension depth present title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundMeasurement woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundDepth-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Depth (cm)");
  });
});
