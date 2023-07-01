import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import WoundAssessmentLeavePopUp from "../woundAssessmentLeavePopUp.component";

jest.mock("../../LeaveWoundAssessment/leaveWoundAssessment.component");
describe("Wound Assessment Leave Pop-Up", () => {
  afterAll(() => {
    cleanup();
  });
  it("renders WoundAssessmentLeavePopUp", () => {
    const setOpen = jest.fn();
    const setModalVisible = jest.fn();
    const modalVisible = true;
    const openFlag = true;
    React.useState = setModalVisible.mockReturnValue([modalVisible, {}]);
    React.useState = setOpen.mockReturnValue([openFlag, {}]);
    render(
      <MemoryRouter initialEntries={["/addWoundAssessment"]}>
        <WoundAssessmentLeavePopUp
          when={true}
          navigate={() => {}}
          shouldBlockNavigation={(location: any) => {
            if (true) {
              if (location.pathname !== "/addWoundAssessment") {
                return true;
              }
            }
            return false;
          }}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("popupConfirm-div");
    expect(title).toBeInTheDocument();
  });
});
