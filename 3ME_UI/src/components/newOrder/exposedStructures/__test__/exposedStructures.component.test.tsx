import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { newOrderWoundInfoTestData } from "../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import { ExposedStructures } from "../exposedStructures.component";

describe("Exudate component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Exposed structures header renders", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ExposedStructures woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const header = screen.getByTestId("exposed-header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Exposed Structures");
  });
  it("Exposed structures options renders", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ExposedStructures woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const option = screen.getByTestId("Muscle");
    expect(option).toBeInTheDocument();
  });
});
