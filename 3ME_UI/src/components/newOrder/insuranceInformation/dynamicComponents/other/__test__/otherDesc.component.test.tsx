import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { OtherDescription } from "../otherDesc.component";

describe("Other desc component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Other desc component textarea", () => {
    render(
      <OtherDescription
        error={false}
        onChange={() => {}}
        primary={true}
        required={true}
        value={"abc"}
      />
    );
    const title = screen.getByTestId("insurance-additional-detail");
    expect(title).toBeInTheDocument();
  });
});
