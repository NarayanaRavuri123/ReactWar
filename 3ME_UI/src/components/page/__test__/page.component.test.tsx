import { MemoryRouter } from "react-router-dom";
import { cleanup, render, screen } from "@testing-library/react";
import { AuthContext } from "../../../context/AuthContext";
import { getMockAuthContextData } from "../../header/__test__/authContextMockData";
import { Page } from "../page.component";

describe("Page component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("FacilityBanner Component render", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
          }}
        >
          <Page />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("pageComponentTest");
    expect(component).toBeInTheDocument();
    const dropDown = screen.queryByText("facility-DropDown");
    expect(dropDown).not.toBeInTheDocument();
  });
});
