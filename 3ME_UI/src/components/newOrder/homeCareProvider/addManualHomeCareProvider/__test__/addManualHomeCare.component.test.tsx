import { cleanup, render, screen } from "@testing-library/react";
import AddManualHomeCare from "../addManualHomeCare";

describe("AddManualHomeCare Component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Home Care Provider Search Popup Exists", () => {
    render(
      <AddManualHomeCare
        states={[]}
        statesText={[]}
        handleFacilitySelect={() => {}}
      />
    );
    const title = screen.getByTestId("manualHomeCare-header");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Add Home Care Provider");
  });
  it("Home Care Provider Manual name field", () => {
    render(
      <AddManualHomeCare
        states={[]}
        statesText={[]}
        handleFacilitySelect={() => {}}
      />
    );
    const label = screen.getByTestId("homeCareName");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Home Care Provider Name");
  });
  it("Home Care Provider Manual address1 field", () => {
    render(
      <AddManualHomeCare
        states={[]}
        statesText={[]}
        handleFacilitySelect={() => {}}
      />
    );
    const label = screen.getByTestId("homeCareAddress1");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Address Line 1 (No P.O. Boxes)");
  });
  it("Home Care Provider Manual address2 field", () => {
    render(
      <AddManualHomeCare
        states={[]}
        statesText={[]}
        handleFacilitySelect={() => {}}
      />
    );
    const label = screen.getByTestId("homeCareAddress2");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Address Line 2");
  });
  it("Home Care Provider Manual city field", () => {
    render(
      <AddManualHomeCare
        states={[]}
        statesText={[]}
        handleFacilitySelect={() => {}}
      />
    );
    const label = screen.getByTestId("homeCareCity");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("City");
  });
  it("Home Care Provider Manual state field", () => {
    render(
      <AddManualHomeCare
        states={[]}
        statesText={[]}
        handleFacilitySelect={() => {}}
      />
    );
    const label = screen.getByTestId("stateTestID");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("State");
  });
});
