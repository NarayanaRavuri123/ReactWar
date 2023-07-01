import React from "react";
import { render, screen, cleanup, within } from "@testing-library/react";
import SignupCard from "../signup/signupcard.component";

describe("Sign up component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("conatins sign up label", () => {
    render(<SignupCard />);
    const { getByText } = within(screen.getByTestId("acountType"));
    expect(
      getByText("What kind of account would you like to create?")
    ).toBeInTheDocument();
  });
  it("facility contact info", () => {
    render(<SignupCard />);
    const { getByText } = within(screen.getByTestId("facilityContact"));
    expect(
      getByText(
        "This portal is intended for use by clinicians in the United States. For further assistance, call the National Contact Center at (800) 275-4524 ext. 41858"
      )
    ).toBeInTheDocument();
  });
  it("DME contact info", () => {
    const dmeContact =
      "This account type cannot be applied for online. Please contact 3M™ at 800-275-4524 ext. 41858 for assistance.";
    render(<SignupCard />);
    const { getByText } = within(screen.getByTestId("dmeContact"));
    expect(getByText(dmeContact)).toBeInTheDocument();
  });
});
