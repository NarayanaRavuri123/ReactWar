import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { patientMockData } from "../../../../../mockData/patientFound";
import { HoldOrResumeTherapy } from "../main/holdOrResumeTherapy.component";
import { IHoldOrResumeTherapy } from "../main/holdOrResumeTherapy.interface";
import { HoldOrResumeTherapyValidator } from "../main/holdOrResumeTherapy.validator";
import { defaultHoldOrResumeTherapyData } from "../main/holdOrResumeTherapy.model";
import { IHoldAndResumeDate } from "../resumeTherapy/resumeTherapy.interface";

describe("HoldOrResumeTherapy Component ->", () => {
  afterAll(() => {
    cleanup();
  });

  const woundDetails = {
    depth: 1,
    direction: "",
    evaluationDate: "",
    id: "",
    isChecked: true,
    length: 5,
    location: "",
    orientation: "",
    therapyHoldDate: "04/04/2023",
    therapyResumptionDate: "04/04/2023",
    type: "",
    width: 9,
    isValid: false,
  };

  jest.mock("react-router-dom", () => ({
    location: jest.fn().mockReturnValue({
      pathname: "/another-route",
      search: "",
      hash: "",
      state: null,
      key: "5nvxpbdafa",
    }),
  }));

  it("HoldTheray componenent render", () => {
    const Validator = new HoldOrResumeTherapyValidator();
    const data = getDeepClone(defaultHoldOrResumeTherapyData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IHoldOrResumeTherapy) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    const origionalHoldAndResumeMinMaxDates: Array<IHoldAndResumeDate> = [];
    React.useState = jest
      .fn()
      .mockReturnValue([origionalHoldAndResumeMinMaxDates, {}]);
    const setOrigionalHoldAndResumeMinMaxDates = jest.fn();
    React.useState = jest
      .fn()
      .mockReturnValue([setOrigionalHoldAndResumeMinMaxDates, {}]);
    const history = createMemoryHistory();
    const patient = getDeepClone(patientMockData);
    render(
      <Router history={history}>
        <HoldOrResumeTherapy
          data={data}
          holdAndResumeMinMaxDates={[]}
          isHoldTherapy={true}
          origionalWounds={[woundDetails]}
          patient={patient}
          setData={mockSetState}
          submitBtnAction={true}
          submitBtnTitle={"submitBtnTitle"}
          title={"title"}
          woundQuestion={"Which wounds should be placed on hold?"}
        />
      </Router>
    );
    const title = screen.getByTestId("holdOrResumeTherapy-title");
    expect(title).toBeInTheDocument();
    const woundChkBox = screen.getByTestId("wound-label-item");
    expect(woundChkBox).toBeInTheDocument();
    expect(woundChkBox).toHaveTextContent(
      "Which wounds should be placed on hold?"
    );
    const dropDown = screen.getByTestId("reasonforhold-test");
    expect(dropDown).toBeInTheDocument();
    expect(dropDown).toHaveTextContent("Reason for Hold");
    const comments = screen.getByTestId("comments-test");
    expect(comments).toBeInTheDocument();
    expect(comments).toHaveTextContent("Comments");
    const submitButton = screen.getByTestId("submitButton");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("submitBtnTitle");
  });

  it("HoldTherapy header validate", () => {
    const Validator = new HoldOrResumeTherapyValidator();
    const data = getDeepClone(defaultHoldOrResumeTherapyData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IHoldOrResumeTherapy) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    const origionalHoldAndResumeMinMaxDates: Array<IHoldAndResumeDate> = [];
    React.useState = jest
      .fn()
      .mockReturnValue([origionalHoldAndResumeMinMaxDates, {}]);
    const setOrigionalHoldAndResumeMinMaxDates = jest.fn();
    React.useState = jest
      .fn()
      .mockReturnValue([setOrigionalHoldAndResumeMinMaxDates, {}]);
    const history = createMemoryHistory();
    const patient = getDeepClone(patientMockData);
    render(
      <Router history={history}>
        <HoldOrResumeTherapy
          data={data}
          holdAndResumeMinMaxDates={[]}
          isHoldTherapy={true}
          origionalWounds={[woundDetails]}
          patient={patient}
          setData={mockSetState}
          submitBtnAction={true}
          submitBtnTitle={"submitBtnTitle"}
          title={"Request Hold"}
          woundQuestion={""}
        />
      </Router>
    );
    const title = screen.getByTestId("holdOrResumeTherapy-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Request Hold");
    const submitButton = screen.getByTestId("submitButton");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("submitBtnTitle");
  });

  it("Request Hold Therapy header validate", () => {
    const Validator = new HoldOrResumeTherapyValidator();
    const data = getDeepClone(defaultHoldOrResumeTherapyData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IHoldOrResumeTherapy) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    const origionalHoldAndResumeMinMaxDates: Array<IHoldAndResumeDate> = [];
    React.useState = jest
      .fn()
      .mockReturnValue([origionalHoldAndResumeMinMaxDates, {}]);
    const setOrigionalHoldAndResumeMinMaxDates = jest.fn();
    React.useState = jest
      .fn()
      .mockReturnValue([setOrigionalHoldAndResumeMinMaxDates, {}]);
    const history = createMemoryHistory();
    const patient = getDeepClone(patientMockData);
    render(
      <Router history={history}>
        <HoldOrResumeTherapy
          data={data}
          holdAndResumeMinMaxDates={[]}
          isHoldTherapy={true}
          origionalWounds={[woundDetails]}
          patient={patient}
          setData={mockSetState}
          submitBtnAction={true}
          submitBtnTitle={"submitBtnTitle"}
          title={"Resume Therapy after Hold"}
          woundQuestion={"Resume Therapy after Hold"}
        />
      </Router>
    );
    const title = screen.getByTestId("holdOrResumeTherapy-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Resume Therapy after Hold");
    const submitButton = screen.getByTestId("submitButton");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("submitBtnTitle");
  });
});
