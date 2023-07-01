import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../footer.component";
import { IFooterContent } from "../footerConten.interface";
import footerComponent from "./footerContent.mock";

describe("Footer component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("initial render", () => {
    const footerContent: Array<IFooterContent> = [];
    React.useState = jest.fn().mockReturnValue([footerContent, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Footer />
      </MemoryRouter>
    );
    const val = screen.getByTestId("footer-box-test");
    expect(val).toBeTruthy();
  });
  it("render footer data", () => {
    const footerContent: Array<IFooterContent> = footerComponent;
    React.useState = jest.fn().mockReturnValue([footerContent, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Footer />
      </MemoryRouter>
    );
    const val = screen.getByText("Legal");
    expect(val).toBeTruthy();
  });
});
