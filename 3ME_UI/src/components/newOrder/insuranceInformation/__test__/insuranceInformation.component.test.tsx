import React from "react";
import userEvent from "@testing-library/user-event";
import { INewOrder } from "../../newOrder.interface";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { newOrderTestData } from "../../__test__/newOrder.test.data";
import { InsuranceInformation } from "../insuranceInformation/insuranceInformation.component";
import { InsuranceInformationValidator } from "../insuranceInformation/insuranceInformation.validator";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
jest.mock("../../../../core/popup/popup.component");

describe("Insurance Information component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Insurance Information validate title for Primary Insurance", () => {
    const Validator = new InsuranceInformationValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <InsuranceInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        isPrimaryComponent={true}
        dropDownDataArray={[]}
        dropDownTextArray={[]}
      />
    );
    const title = screen.getByTestId("insurance-informantion-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Primary Insurance Information");
  });

  it("Insurance Information validate title for Secondary Insurance", () => {
    const Validator = new InsuranceInformationValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <InsuranceInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        isPrimaryComponent={false}
        dropDownDataArray={[]}
        dropDownTextArray={[]}
      />
    );
    const title = screen.getByTestId("insurance-informantion-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Secondary Insurance Information");
  });

  it("Insurance Information validate Insurance type for Primary Insurance", () => {
    const Validator = new InsuranceInformationValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <InsuranceInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        isPrimaryComponent={true}
        dropDownDataArray={[]}
        dropDownTextArray={[]}
      />
    );
    const title = screen.getByTestId("primary-insurance-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Insurance Type*");
    const value = screen.getByTestId("primary-insurance-type-value");
    expect(value).toBeInTheDocument();
  });

  it("Insurance Information validate Insurance type for Secondary Insurance", () => {
    const Validator = new InsuranceInformationValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <InsuranceInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        isPrimaryComponent={false}
        dropDownDataArray={[]}
        dropDownTextArray={[]}
      />
    );
    const title = screen.getByTestId("secondary-insurance-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Insurance Type*");
    const value = screen.getByTestId("secondary-insurance-type-value");
    expect(value).toBeInTheDocument();
  });
});
