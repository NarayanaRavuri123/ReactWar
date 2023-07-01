import { cleanup, render, screen } from "@testing-library/react";
import WoundTitleValue from "../woundTitleValue.component";
describe("Wound Title component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Wound Assessor header validation", () => {
    render(
      <WoundTitleValue
        title="Initialized"
        value="Finally"
        testID="testing-value"
      />
    );

    const woundTitle = screen.getByTestId("testing-value-title");
    expect(woundTitle).toBeInTheDocument();
    expect(woundTitle).toHaveTextContent("Initialized");
    const woundValue = screen.getByTestId("testing-value-value");
    expect(woundValue).toBeInTheDocument();
    expect(woundValue).toHaveTextContent("Finally");
  });
});
