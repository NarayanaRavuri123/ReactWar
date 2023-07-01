import React from "react";
import { INewOrder } from "../../newOrder.interface";
import { NewOrderValidator } from "../../newOrder.validator";
import { PrintCommonDocs } from "../printCommonDocs.component";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { cleanup, render, screen } from "@testing-library/react";
import { newOrderTestData } from "../../__test__/newOrder.test.data";

describe("Print CommonDocs component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Print CommonDocs validate title", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <PrintCommonDocs
        data={data}
        setData={mockSetState}
        Validator={Validator}
        printableDocumentsLink={undefined}
      />
    );
    const title = screen.getByTestId("printCommonDocs-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Print Common Docs");
  });
  it("Print CommonDocs validate Common docs", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <PrintCommonDocs
        data={data}
        setData={mockSetState}
        Validator={Validator}
        printableDocumentsLink={undefined}
      />
    );
    const title = screen.getByText("Common Docs");
    expect(title).toBeInTheDocument();
    const placeHolder = screen.getByText("Select document to print");
    expect(placeHolder).toBeInTheDocument();
  });
  it("Print CommonDocs validate Open Button", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <PrintCommonDocs
        data={data}
        setData={mockSetState}
        Validator={Validator}
        printableDocumentsLink={undefined}
      />
    );
    const title = screen.getByTestId("button-printCommonDocs");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Open");
  });
});
