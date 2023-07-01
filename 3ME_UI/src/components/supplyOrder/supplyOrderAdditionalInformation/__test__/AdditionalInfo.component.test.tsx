import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { supplyOrderTestData } from "../../__test__/supplyOrder.test.data";
import { MemoryRouter } from "react-router";
import SupplyOrderAdditionalInfo from "../SupplyOrderAdditionalInfo.component";

describe("Provide additional Info component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Provide additional Info title Validate", () => {
    const data = getDeepClone(supplyOrderTestData);
    const mockSetState = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SupplyOrderAdditionalInfo
          data={data}
          setData={mockSetState}
          isReviewOrder={false}
          openSupplyOrderPageEdit={undefined}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("addtional-title-test");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Provide Additional Information");
  });

  it("Provide additional Info desp Validate", () => {
    const data = getDeepClone(supplyOrderTestData);
    const mockSetState = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SupplyOrderAdditionalInfo
          data={data}
          setData={mockSetState}
          isReviewOrder={false}
          openSupplyOrderPageEdit={undefined}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("additionalInfolabelTest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Additional Notes");
  });
});
