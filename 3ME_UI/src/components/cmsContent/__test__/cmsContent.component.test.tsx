import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { CMSContent } from "../cmsContent.component";

describe("Footer component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check previous button present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CMSContent />
      </MemoryRouter>
    );
    const val = screen.getByTestId("previous-test");
    expect(val).toBeTruthy();
  });

  it("To check the paragraph content present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CMSContent />
      </MemoryRouter>
    );
    const val = screen.getByTestId("para-test");
    expect(val).toBeTruthy();
  });
});
