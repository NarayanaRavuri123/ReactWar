import React from "react";
import { Accessories } from "../accessories.component";
import { IProductAccessory } from "../../../newOrder.interface";
import { NewOrderValidator } from "../../../newOrder.validator";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { accessoryTestData } from "../../../__test__/newOrder.test.data";

describe("Accessories Component", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check header of Accessories Component", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(accessoryTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IProductAccessory) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    const loadAccesory: boolean = false;
    React.useState = jest.fn().mockReturnValue([loadAccesory, {}]);
    const useStateMock: any = (useState: any) => [
      (useState = []),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <Accessories accessoriesList={[]} data={data} setData={mockSetState} />
    );
    const header = screen.getByTestId("add-accessories-header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("3M™ V.A.C.® Therapy Accessories");
  });
  it("To check description of Accessories Component", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(accessoryTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IProductAccessory) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    const loadAccesory: boolean = false;
    React.useState = jest.fn().mockReturnValue([loadAccesory, {}]);
    const useStateMock: any = (useState: any) => [
      (useState = []),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <Accessories accessoriesList={[]} data={data} setData={mockSetState} />
    );
    const description = screen.getByTestId("add-accessories-description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "3M™ V.A.C.® Therapy Accessories are provided as a case of the selected accessory."
    );
  });

  it("To check add accessory button when accessories count is 0 of Accessories Component", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(accessoryTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IProductAccessory) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    const loadAccesory: boolean = false;
    React.useState = jest.fn().mockReturnValue([loadAccesory, {}]);
    const useStateMock: any = (useState: any) => [
      (useState = []),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <Accessories accessoriesList={[]} data={data} setData={mockSetState} />
    );
    const addButton = screen.getByTestId("add-accessory-button");
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent("Add Accessory");
  });

  it("To check add accessory button when accessories count is 1 of Accessories Component", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(accessoryTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IProductAccessory) => [dt, mockSetState],
    }));
    const loadAccesory: boolean = false;
    React.useState = jest.fn().mockReturnValue([loadAccesory, {}]);
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    const useStateMock: any = (useState: any) => [
      (useState = ["test1"]),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <Accessories accessoriesList={[]} data={data} setData={mockSetState} />
    );
    const addButton = screen.getByTestId("add-accessory-button");
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent("Add Accessory");
  });

  it("To check add accessory button when accessories count is 2 of Accessories Component", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(accessoryTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IProductAccessory) => [dt, mockSetState],
    }));
    const loadAccesory: boolean = false;
    React.useState = jest.fn().mockReturnValue([loadAccesory, {}]);
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    const useStateMock: any = (useState: any) => [
      (useState = ["test1", "test2"]),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <Accessories accessoriesList={[]} data={data} setData={mockSetState} />
    );
    const addButton = screen.getByTestId("add-accessory-button");
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent("Add Accessory");
  });

  it("To check add accessory button when accessories count is 3 of Accessories Component", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(accessoryTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IProductAccessory) => [dt, mockSetState],
    }));
    const loadAccesory: boolean = false;
    React.useState = jest.fn().mockReturnValue([loadAccesory, {}]);
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    const useStateMock: any = (useState: any) => [
      (useState = ["test1", "test2", "test3"]),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <Accessories accessoriesList={[]} data={data} setData={mockSetState} />
    );
    const addButton = screen.getByTestId("add-accessory-button");
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent("Add Accessory");
  });

  it("To check select accessory dropdown when accessories count is 1 of Accessories Component", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(accessoryTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IProductAccessory) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    const loadAccesory: boolean = false;
    React.useState = jest.fn().mockReturnValue([loadAccesory, {}]);
    const useStateMock: any = (useState: any) => [
      (useState = [""]),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <Accessories accessoriesList={[]} data={data} setData={mockSetState} />
    );

    const dropDown = screen.getByTestId("custom-removable-dropDown-0");
    expect(dropDown).toBeInTheDocument();
    expect(dropDown).toHaveTextContent("Accessory");
    const value = screen.getByTestId("custom-removable-dropDown-0-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Select an accessory");
  });

  it("To check select accessory dropdown when accessories count is 2 of Accessories Component", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(accessoryTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IProductAccessory) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    const loadAccesory: boolean = false;
    React.useState = jest.fn().mockReturnValue([loadAccesory, {}]);
    const useStateMock: any = (useState: any) => [
      (useState = ["", ""]),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <Accessories accessoriesList={[]} data={data} setData={mockSetState} />
    );

    const dropDown1 = screen.getByTestId("custom-removable-dropDown-0");
    expect(dropDown1).toBeInTheDocument();
    expect(dropDown1).toHaveTextContent("Accessory");
    const value1 = screen.getByTestId("custom-removable-dropDown-0-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("Select an accessory");

    const dropDown2 = screen.getByTestId("custom-removable-dropDown-1");
    expect(dropDown2).toBeInTheDocument();
    expect(dropDown2).toHaveTextContent("Accessory");
    const value2 = screen.getByTestId("custom-removable-dropDown-1-value");
    expect(value2).toBeInTheDocument();
    expect(value2).toHaveTextContent("Select an accessory");
  });

  it("To check select accessory dropdown when accessories count is 3 of Accessories Component", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(accessoryTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IProductAccessory) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    const loadAccesory: boolean = false;
    React.useState = jest.fn().mockReturnValue([loadAccesory, {}]);
    const useStateMock: any = (useState: any) => [
      (useState = ["", "", ""]),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <Accessories accessoriesList={[]} data={data} setData={mockSetState} />
    );

    const dropDown1 = screen.getByTestId("custom-removable-dropDown-0");
    expect(dropDown1).toBeInTheDocument();
    expect(dropDown1).toHaveTextContent("Accessory");
    const value1 = screen.getByTestId("custom-removable-dropDown-0-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("Select an accessory");

    const dropDown2 = screen.getByTestId("custom-removable-dropDown-1");
    expect(dropDown2).toBeInTheDocument();
    expect(dropDown2).toHaveTextContent("Accessory");
    const value2 = screen.getByTestId("custom-removable-dropDown-1-value");
    expect(value2).toBeInTheDocument();
    expect(value2).toHaveTextContent("Select an accessory");

    const dropDown3 = screen.getByTestId("custom-removable-dropDown-2");
    expect(dropDown3).toBeInTheDocument();
    expect(dropDown3).toHaveTextContent("Accessory");
    const value3 = screen.getByTestId("custom-removable-dropDown-2-value");
    expect(value3).toBeInTheDocument();
    expect(value3).toHaveTextContent("Select an accessory");
  });

  it("To check select accessory dropdown when accessories count is 4 of Accessories Component", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(accessoryTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IProductAccessory) => [dt, mockSetState],
    }));
    const loadAccesory: boolean = false;
    React.useState = jest.fn().mockReturnValue([loadAccesory, {}]);
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    const useStateMock: any = (useState: any) => [
      (useState = ["", "", "", ""]),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <Accessories accessoriesList={[]} data={data} setData={mockSetState} />
    );

    const dropDown1 = screen.getByTestId("custom-removable-dropDown-0");
    expect(dropDown1).toBeInTheDocument();
    expect(dropDown1).toHaveTextContent("Accessory");
    const value1 = screen.getByTestId("custom-removable-dropDown-0-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("Select an accessory");

    const dropDown2 = screen.getByTestId("custom-removable-dropDown-1");
    expect(dropDown2).toBeInTheDocument();
    expect(dropDown2).toHaveTextContent("Accessory");
    const value2 = screen.getByTestId("custom-removable-dropDown-1-value");
    expect(value2).toBeInTheDocument();
    expect(value2).toHaveTextContent("Select an accessory");

    const dropDown3 = screen.getByTestId("custom-removable-dropDown-2");
    expect(dropDown3).toBeInTheDocument();
    expect(dropDown3).toHaveTextContent("Accessory");
    const value3 = screen.getByTestId("custom-removable-dropDown-2-value");
    expect(value3).toBeInTheDocument();
    expect(value3).toHaveTextContent("Select an accessory");

    const dropDown4 = screen.getByTestId("custom-removable-dropDown-3");
    expect(dropDown4).toBeInTheDocument();
    expect(dropDown4).toHaveTextContent("Accessory");
    const value4 = screen.getByTestId("custom-removable-dropDown-3-value");
    expect(value4).toBeInTheDocument();
    expect(value4).toHaveTextContent("Select an accessory");
  });
});
