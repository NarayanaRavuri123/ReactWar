import React from "react";
import { render, screen, cleanup, within } from "@testing-library/react";
import ProgressBar from "../progressBar.component";

describe("progress bar component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("renders back btn", () => {
    render(<ProgressBar progressValue={25} pageTitle="Sign up" />);
    const bckBtn = screen.getByTestId("signupBckBtn");
    expect(bckBtn).toBeInTheDocument();
  });
  it("conatins sign up label", () => {
    render(<ProgressBar progressValue={25} pageTitle="Sign up" />);
    const label = screen.getByTestId("signupLabel");
    expect(label).toBeInTheDocument();
  });
  it("sign up label has Sign up text", () => {
    render(<ProgressBar progressValue={25} pageTitle="Sign up" />);
    const { getByText } = within(screen.getByTestId("signupLabel"));
    expect(getByText("Sign up")).toBeInTheDocument();
  });
});
