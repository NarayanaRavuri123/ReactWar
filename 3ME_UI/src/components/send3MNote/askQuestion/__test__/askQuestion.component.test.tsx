import React from "react";
import { MemoryRouter } from "react-router-dom";
import { AskQuestion } from "../askQuestion.component";
import { IAskQuestion } from "../askQuestion.interface";
import { SendNoteValidator } from "../../sendNote.validator";
import { askQuestioTestnData } from "./askQuestion.test.data";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Change Patient Address  component", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate header title", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(askQuestioTestnData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IAskQuestion) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AskQuestion data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("ask-question-info-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Question Details");
  });

  it("Validate question input field", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(askQuestioTestnData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IAskQuestion) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    const mockSetData = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AskQuestion data={data} setData={mockSetData} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("question-input-label");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Your Question*");
    const inputText = screen.getByTestId("question-input-value");
    expect(inputText).toBeInTheDocument();
    userEvent.type(inputText, "Rahul Patil");
    expect(mockSetData).toBeCalled();
  });
});
