import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LeaveWoundAssessment } from "../leaveWoundAssessment.component";

describe("LeaveSupplyOrder component->", () => {
  afterAll(() => {
    cleanup();
  });
  it("back button present for leave assessment popup", () => {
    render(
      <LeaveWoundAssessment
        handlePageChange={() => {}}
        title="Are you sure you want to leave this assessment?"
        buttonTitle={""}
        handleCancelLeavePopUp={true}
        cancelLeaveOpen={true}
        cancelConfirmText={""}
        backBtnText="Back"
        WoundAssessmentObj={null}
      />
    );
    const backbtn = screen.getByTestId("backButton");
    expect(backbtn).toBeInTheDocument();
    expect(backbtn).toHaveTextContent("Back");
  });
  it("Leave button present for leave order popup", () => {
    render(
      <LeaveWoundAssessment
        handlePageChange={() => {}}
        title="Are you sure you want to leave this assessment?"
        buttonTitle="Leave Assessment"
        handleCancelLeavePopUp={true}
        cancelLeaveOpen={true}
        cancelConfirmText={""}
        backBtnText="Back"
        WoundAssessmentObj={null}
      />
    );
    const leavebtn = screen.getByTestId("leaveButton");
    expect(leavebtn).toBeInTheDocument();
    expect(leavebtn).toHaveTextContent("Leave");
  });
  it("verify leave wound assessment modal pop up ", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LeaveWoundAssessment
          handlePageChange={() => {}}
          title="Are you sure you want to leave this assessment?"
          buttonTitle={""}
          handleCancelLeavePopUp={true}
          cancelLeaveOpen={true}
          cancelConfirmText={""}
          backBtnText={""}
          WoundAssessmentObj={null}
        ></LeaveWoundAssessment>
      </MemoryRouter>
    );
    const header = screen.getByTestId(
      "cancelConfirmAssessmentText"
    ).textContent;
    expect(header).toBe(`Are you sure you want to leave this assessment?`);
  });
  it("Leave assessment button action, redirect to MPD", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LeaveWoundAssessment
          handlePageChange={() => {}}
          title="Are you sure you want to leave this assessment?"
          buttonTitle="Leave Assessment"
          handleCancelLeavePopUp={spyFn}
          cancelLeaveOpen={true}
          cancelConfirmText={""}
          backBtnText={""}
          WoundAssessmentObj={null}
        ></LeaveWoundAssessment>
      </MemoryRouter>
    );
    const leaveButton = screen.getByTestId("leaveButton");
    expect(leaveButton).toHaveTextContent("Leave Assessment");
    fireEvent.click(leaveButton);
    expect(screen.getByTestId("leaveAssessmentPopup")).toBeInTheDocument();
  });

  it("Cancel Confirmation", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LeaveWoundAssessment
          handlePageChange={() => {}}
          title="Are you sure you want to leave this assessment?"
          buttonTitle="Leave Assessment"
          handleCancelLeavePopUp={spyFn}
          cancelLeaveOpen={true}
          cancelConfirmText={""}
          backBtnText={""}
          WoundAssessmentObj={null}
        ></LeaveWoundAssessment>
      </MemoryRouter>
    );
    const title = screen.getByTestId("cancelConfirmAssessmentText");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Are you sure you want to leave this assessment?"
    );
    const subtitle = screen.getByTestId("cancelConfirmationTextDesc");
    expect(subtitle).toBeInTheDocument();
  });
});
