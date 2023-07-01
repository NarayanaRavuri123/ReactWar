import React from "react";
import { cleanup, render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { ManageAccountHeader } from "../manageAccountHeader";

describe("Manage Account", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Manage Account  header Present", () => {
    render(<ManageAccountHeader />);

    const aacHeaderText = screen.getByTestId("manage-acc-title-test");
    expect(aacHeaderText).toBeInTheDocument();
    expect(aacHeaderText).toHaveTextContent("Account administration");
  });
  it("accInfoTest", () => {
    render(<ManageAccountHeader />);
    const accInfoTest = screen.getByTestId("accountDesTest");
    expect(accInfoTest).toBeInTheDocument();
    expect(accInfoTest).toHaveTextContent(
      "For any questions regarding your account, please contact 3M™ Medical Solutions Customer Support at 1-800-275-4524 extension 41858"
    );
  });
});
