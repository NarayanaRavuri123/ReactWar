import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CancellationConfirmationPopup } from "../cancellationConfirmationPopup.component";

describe("DeletePopup Popup component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Cancel confirmation Title present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CancellationConfirmationPopup
          closeCancelOrderconfirmationPopup={() => {}}
          cancelReadyCareOrder={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("confirmationPopupTitleTest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Are you sure you want to cancel this order?"
    );
  });
  it("Do not cancel confirmation Title present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CancellationConfirmationPopup
          closeCancelOrderconfirmationPopup={() => {}}
          cancelReadyCareOrder={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("do-not-cancel-Test");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("No, Do Not Cancel");
  });
  it("Yes cancel the Order Title present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CancellationConfirmationPopup
          closeCancelOrderconfirmationPopup={() => {}}
          cancelReadyCareOrder={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("yes-cancel-Test");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Yes, Cancel Order");
  });
});
