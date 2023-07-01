import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { LeaveSupplyOrder } from "../leaveSupplyOrder.component";

describe("LeaveSupplyOrder component->", () => {
  afterAll(() => {
    cleanup();
  });
  it("back button present for leave order popup", () => {
    render(
      <LeaveSupplyOrder
        title="Are you sure you want to leave this order?"
        buttonTitle={""}
        handleCancelLeavePopUp={true}
        cancelLeaveOpen={true}
        cancelConfirmText={""}
        backBtnText="Back"
        SupplyOrderObj={null}
      />
    );
    const backbtn = screen.getByTestId("backBtn");
    expect(backbtn).toBeInTheDocument();
    expect(backbtn).toHaveTextContent("Back");
  });
  it("Leave button present for leave order popup", () => {
    render(
      <LeaveSupplyOrder
        title="Are you sure you want to leave this order?"
        buttonTitle="Leave"
        handleCancelLeavePopUp={true}
        cancelLeaveOpen={true}
        cancelConfirmText={""}
        backBtnText="Back"
        SupplyOrderObj={null}
      />
    );
    const leavebtn = screen.getByTestId("leaveBtn");
    expect(leavebtn).toBeInTheDocument();
    expect(leavebtn).toHaveTextContent("Leave");
  });
  it("verify leave supply order modal pop up ", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LeaveSupplyOrder
          title="Are you sure you want to leave this order?"
          buttonTitle={""}
          handleCancelLeavePopUp={true}
          cancelLeaveOpen={true}
          cancelConfirmText={""}
          backBtnText={""}
          SupplyOrderObj={null}
        ></LeaveSupplyOrder>
      </MemoryRouter>
    );
    const header = screen.getByTestId("cancelConfirmationText").textContent;
    expect(header).toBe(`Are you sure you want to leave this order?`);
  });
  it("Leave order button action, redirect to MPD", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LeaveSupplyOrder
          title="Are you sure you want to leave this order?"
          buttonTitle="Leave"
          handleCancelLeavePopUp={spyFn}
          cancelLeaveOpen={true}
          cancelConfirmText={""}
          backBtnText={""}
          SupplyOrderObj={null}
        ></LeaveSupplyOrder>
      </MemoryRouter>
    );
    const leaveButton = screen.getByTestId("leaveBtn");
    expect(leaveButton).toHaveTextContent("Leave");
    fireEvent.click(leaveButton);
    expect(screen.getByTestId("leaveOrderPopup")).toBeInTheDocument();
  });
});
