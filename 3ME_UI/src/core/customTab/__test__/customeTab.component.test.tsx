import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TabSelector } from "../../customTab/tabSelector";

describe("custom DropZone component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate tab created or not", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TabSelector
          isActive={true}
          onClick={() => {}}
          title="tab-new"
          testId="tab-test-id"
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("tab-test-id");
    expect(title).toBeInTheDocument();
  });
});
