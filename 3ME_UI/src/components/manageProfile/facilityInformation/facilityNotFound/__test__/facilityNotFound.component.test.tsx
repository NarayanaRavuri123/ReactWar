import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { SearchSection } from "../../addFacilityContainer/addFacilityContainer.enum";
import { FacilityNotFound } from "../facilityNotFound.component";

describe("Patient Not Found component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("header text to be visible", () => {
    const spyFn = jest.fn();
    render(<FacilityNotFound redirectHandler={spyFn} />);
    const val = screen.getByTestId("no-results");
    expect(val?.textContent).toBe("No results");
  });
  it("message text to be visible", () => {
    const spyFn = jest.fn();
    const textMsg =
      "Manual entry will require facility setup which may take 1 to 5 business days to complete. You will receive an email notification that access request has been approved.";
    render(<FacilityNotFound redirectHandler={spyFn} />);
    const val = screen.getByTestId("no-results-msg");
    expect(val?.textContent).toBe(textMsg);
  });
  it("on click of search again, redirectHandler should be called", () => {
    const spyFn = jest.fn();
    render(<FacilityNotFound redirectHandler={spyFn} />);

    fireEvent.click(screen.getByText("Search Again"));
    expect(spyFn).toHaveBeenCalledWith(SearchSection.SEARCH_FORM);
  });
});
