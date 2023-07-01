import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { VerifyRequesterInfo } from "../verifyRequesterInfo";
import { IRequesterInfo } from "../../newOrder.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { requesterTestData } from "../../__test__/newOrder.test.data";
import { NewOrderValidator } from "../../newOrder.validator";
import userEvent from "@testing-library/user-event";

jest.mock("../../../../core/popup/popup.component");
describe("VerifyRequesterInfo", () => {
  afterAll(() => {
    cleanup();
  });

  it("To check verify request info header Present", () => {
    const Validator = new NewOrderValidator();
    const requesterData = getDeepClone(requesterTestData);
    const mockRequesterSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IRequesterInfo) => [dt, mockRequesterSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <VerifyRequesterInfo
        requesterInfo={requesterData}
        setRequesterInfo={mockRequesterSetState}
      />
    );
    const verifyInfo = screen.getByTestId("verify-requester-infoTest");
    expect(verifyInfo).toBeInTheDocument();
    expect(verifyInfo).toHaveTextContent("Verify Requester Info");
  });

  it("verify request first name should match the value provided", () => {
    const Validator = new NewOrderValidator();
    const requesterData = getDeepClone(requesterTestData);
    const mockRequesterSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IRequesterInfo) => [dt, mockRequesterSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <VerifyRequesterInfo
        requesterInfo={requesterData}
        setRequesterInfo={mockRequesterSetState}
      />
    );
    const firstNameDiv = screen.getByTestId("requesterFirstNameTest");
    userEvent.type(firstNameDiv, "Rece");
    expect(mockRequesterSetState).toHaveBeenCalled();
  });

  it("verify request Last name should match the value provided", () => {
    const Validator = new NewOrderValidator();
    const requesterData = getDeepClone(requesterTestData);
    const mockRequesterSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IRequesterInfo) => [dt, mockRequesterSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <VerifyRequesterInfo
        requesterInfo={requesterData}
        setRequesterInfo={mockRequesterSetState}
      />
    );
    const firstNameDiv = screen.getByTestId("requesterLastNameTest");
    userEvent.type(firstNameDiv, "Jones");
    expect(mockRequesterSetState).toHaveBeenCalled();
  });

  it("same as submitter Checkbox to be  Present", () => {
    const Validator = new NewOrderValidator();
    const requesterData = getDeepClone(requesterTestData);
    const mockRequesterSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IRequesterInfo) => [dt, mockRequesterSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <VerifyRequesterInfo
        requesterInfo={requesterData}
        setRequesterInfo={mockRequesterSetState}
      />
    );
    const patientCurrentAddressChkBoxDiv = screen.getByTestId(
      "verifyRequesterCheckBoxTest"
    );
    expect(patientCurrentAddressChkBoxDiv).toBeInTheDocument();
  });

  it("Verify Request validate change facility button", () => {
    const Validator = new NewOrderValidator();
    const requesterData = getDeepClone(requesterTestData);
    const mockRequesterSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IRequesterInfo) => [dt, mockRequesterSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <VerifyRequesterInfo
        requesterInfo={requesterData}
        setRequesterInfo={mockRequesterSetState}
      />
    );
    const title = screen.getByTestId("ChangeFacilityTest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Change Facility");
  });
});
