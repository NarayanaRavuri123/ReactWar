import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { TermsOfUse } from "../termsofUse.component";

jest.mock("@okta/okta-react", () => ({
  useOktaAuth: () => {
    return {
      authState: {},
      authService: {},
    };
  },
  withOktaAuth: (x: any) => x,
}));

describe("terms of use component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check back button present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TermsOfUse />
      </MemoryRouter>
    );
    const val = screen.getByTestId("terms-back");
    expect(val).toBeTruthy();
  });
  it("To check accept button present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TermsOfUse />
      </MemoryRouter>
    );
    const val = screen.getByTestId("terms-accept");
    expect(val).toBeTruthy();
  });

  it("To check the paragraph content present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TermsOfUse />
      </MemoryRouter>
    );
    const val = screen.getByTestId("para-terms-test");
    expect(val).toBeTruthy();
  });
});
