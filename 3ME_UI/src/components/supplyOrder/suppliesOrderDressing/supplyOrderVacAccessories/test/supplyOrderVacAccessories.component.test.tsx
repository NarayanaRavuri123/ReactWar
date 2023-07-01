import React from "react";
import { ISupplyOrder } from "../../../supplyOrder.interface";
import { cleanup, render, screen } from "@testing-library/react";
import { defaultAccessories } from "../../../../newOrder/newOrder.model";
import { SupplyOrderVacDressingAccessories } from "../supplyOrderVacAccessories.component";

describe("Supply Order VAC SupplyOrderVacDressingAccessories Kit", () => {
  afterAll(() => {
    cleanup();
  });

  it("To check SupplyOrderVacDressingAccessories header Present", () => {
    render(
      <SupplyOrderVacDressingAccessories
        accessoriesList={[]}
        accessoriesDetails={defaultAccessories}
        loadAccesory={false}
        setAccessoriesDetails={() => {}}
        setLoadAccesory={() => {}}
      />
    );
    const dressingSupplies = screen.getByTestId(
      "supply-add-accessories-header"
    );
    expect(dressingSupplies).toBeInTheDocument();
    expect(dressingSupplies).toHaveTextContent(
      "3M™ V.A.C.® Therapy Accessories"
    );
  });

  it("To check Add VAC SupplyOrderVacDressingAccessories Add button Present", () => {
    render(
      <SupplyOrderVacDressingAccessories
        accessoriesList={[]}
        accessoriesDetails={defaultAccessories}
        loadAccesory={false}
        setAccessoriesDetails={() => {}}
        setLoadAccesory={() => {}}
      />
    );
    const dressingSupplies = screen.getByTestId("supply-add-accessory-button");
    expect(dressingSupplies).toBeInTheDocument();
  });

  it("To check add accessory button when accessories count is 0 of SupplyOrderVacDressingAccessories Component", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    const useStateMock: any = (useState: any) => [
      (useState = []),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <SupplyOrderVacDressingAccessories
        accessoriesList={[]}
        accessoriesDetails={defaultAccessories}
        loadAccesory={false}
        setAccessoriesDetails={mockSetState}
        setLoadAccesory={() => {}}
      />
    );
    const addButton = screen.getByTestId("supply-add-accessory-button");
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent("Add Accessory");
  });

  it("To check add accessory button when accessories count is 1 of SupplyOrderVacDressingAccessories Component", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    const useStateMock: any = (useState: any) => [
      (useState = ["test1"]),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <SupplyOrderVacDressingAccessories
        accessoriesList={[]}
        accessoriesDetails={defaultAccessories}
        loadAccesory={false}
        setAccessoriesDetails={() => {}}
        setLoadAccesory={() => {}}
      />
    );
    const addButton = screen.getByTestId("supply-add-accessory-button");
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent("Add Accessory");
  });

  it("To check add accessory button when accessories count is 2 of SupplyOrderVacDressingAccessories Component", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    const useStateMock: any = (useState: any) => [
      (useState = ["test1", "test2"]),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <SupplyOrderVacDressingAccessories
        accessoriesList={[]}
        accessoriesDetails={defaultAccessories}
        loadAccesory={false}
        setAccessoriesDetails={mockSetState}
        setLoadAccesory={() => {}}
      />
    );
    const addButton = screen.getByTestId("supply-add-accessory-button");
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent("Add Accessory");
  });

  it("To check add accessory button when accessories count is 3 of SupplyOrderVacDressingAccessories Component", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    const useStateMock: any = (useState: any) => [
      (useState = ["test1", "test2", "test3"]),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <SupplyOrderVacDressingAccessories
        accessoriesList={[]}
        accessoriesDetails={defaultAccessories}
        loadAccesory={false}
        setAccessoriesDetails={mockSetState}
        setLoadAccesory={() => {}}
      />
    );
    const addButton = screen.getByTestId("supply-add-accessory-button");
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent("Add Accessory");
  });

  it("To check select accessory dropdown when accessories count is 1 of SupplyOrderVacDressingAccessories Component", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    const useStateMock: any = (useState: any) => [
      (useState = [""]),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <SupplyOrderVacDressingAccessories
        accessoriesList={[]}
        accessoriesDetails={defaultAccessories}
        setAccessoriesDetails={mockSetState}
        loadAccesory={false}
        setLoadAccesory={() => {}}
      />
    );

    const dropDown = screen.getByTestId("custom-removable-dropDown-0");
    expect(dropDown).toBeInTheDocument();
    expect(dropDown).toHaveTextContent("Accessory");
    const value = screen.getByTestId("custom-removable-dropDown-0-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Select an accessory");
  });

  it("To check select accessory dropdown when accessories count is 2 of SupplyOrderVacDressingAccessories Component", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    const useStateMock: any = (useState: any) => [
      (useState = ["", ""]),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <SupplyOrderVacDressingAccessories
        accessoriesList={[]}
        accessoriesDetails={defaultAccessories}
        loadAccesory={false}
        setAccessoriesDetails={mockSetState}
        setLoadAccesory={() => {}}
      />
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

  it("To check select accessory dropdown when accessories count is 3 of SupplyOrderVacDressingAccessories Component", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    const useStateMock: any = (useState: any) => [
      (useState = ["", "", ""]),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <SupplyOrderVacDressingAccessories
        accessoriesList={[]}
        accessoriesDetails={defaultAccessories}
        loadAccesory={false}
        setAccessoriesDetails={mockSetState}
        setLoadAccesory={() => {}}
      />
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

  it("To check select accessory dropdown when accessories count is 4 of SupplyOrderVacDressingAccessories Component", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    const useStateMock: any = (useState: any) => [
      (useState = ["", "", "", ""]),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <SupplyOrderVacDressingAccessories
        accessoriesList={[]}
        accessoriesDetails={defaultAccessories}
        loadAccesory={false}
        setAccessoriesDetails={mockSetState}
        setLoadAccesory={() => {}}
      />
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
