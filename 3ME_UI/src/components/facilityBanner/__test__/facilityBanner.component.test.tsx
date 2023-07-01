import { cleanup, render, screen } from "@testing-library/react";
import { FacilityBanner } from "../facilityBanner.component";

describe("FacilityBanner ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Component render", () => {
    render(<FacilityBanner isComponentVisibleTest={true} isLoadUI={true} />);
    const component = screen.getByTestId("facility-Banner");
    expect(component).toBeInTheDocument();
  });
});
