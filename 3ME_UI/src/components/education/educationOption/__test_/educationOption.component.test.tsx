import React from "react";
import { EducationOption } from "../educationOption.component";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { cleanup, render, screen } from "@testing-library/react";
import { mockEducationOptionData } from "../../__test__/educationOptions.data";

describe("Education Option Component", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate education option 1", () => {
    const educationOptions = getDeepClone(mockEducationOptionData);
    React.useState = jest.fn().mockReturnValue([educationOptions, {}]);
    const encryptedUserName = "";
    React.useState = jest.fn().mockReturnValue([encryptedUserName, {}]);
    const setEncryptedUserName = jest.fn();
    React.useState = jest.fn().mockReturnValue([setEncryptedUserName, {}]);
    render(
      <EducationOption
        openVideoLibrary={() => {}}
        option={educationOptions[0]}
      />
    );
    const option1 = screen.getByTestId("education-option-component-1");
    expect(option1).toBeInTheDocument();
    const option1Title = screen.getByTestId("education-option-title-1");
    expect(option1Title).toBeInTheDocument();
    expect(option1Title).toHaveTextContent("3M™ Health Care Academy");
  });

  it("Validate education option 2", () => {
    const educationOptions = getDeepClone(mockEducationOptionData);
    React.useState = jest.fn().mockReturnValue([educationOptions, {}]);
    const setEncryptedUserName = jest.fn();
    React.useState = jest.fn().mockReturnValue([setEncryptedUserName, {}]);
    render(
      <EducationOption
        openVideoLibrary={() => {}}
        option={educationOptions[1]}
      />
    );
    const option2 = screen.getByTestId("education-option-component-2");
    expect(option2).toBeInTheDocument();
    const option2Title = screen.getByTestId("education-option-title-2");
    expect(option2Title).toBeInTheDocument();
    expect(option2Title).toHaveTextContent("Wound Therapy Guide");
  });

  it("Validate education option 3", () => {
    const educationOptions = getDeepClone(mockEducationOptionData);
    React.useState = jest.fn().mockReturnValue([educationOptions, {}]);
    const setEncryptedUserName = jest.fn();
    React.useState = jest.fn().mockReturnValue([setEncryptedUserName, {}]);
    render(
      <EducationOption
        openVideoLibrary={() => {}}
        option={educationOptions[2]}
      />
    );
    const option3Title = screen.getByTestId("education-option-title-3");
    expect(option3Title).toBeInTheDocument();
    expect(option3Title).toHaveTextContent("Video Library");
  });
});
