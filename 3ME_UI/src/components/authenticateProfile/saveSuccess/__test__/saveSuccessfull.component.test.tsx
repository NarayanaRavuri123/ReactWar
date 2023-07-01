import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SaveSuccessfull } from "../saveSuccessfull.component";

describe("authenticate Profile update component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate Save Successfull page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SaveSuccessfull returnButtonText="Return Home" returnToPath="/home" />
      </MemoryRouter>
    );
    const successText = document.querySelector(".successCardContainer")!;
    expect(successText).toBeInTheDocument();
  });
});
