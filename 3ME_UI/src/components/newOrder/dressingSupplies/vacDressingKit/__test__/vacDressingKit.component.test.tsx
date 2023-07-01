import * as React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { VacDressingKit } from "../vacDressingKit.component";
import { IDressingKit } from "../../../newOrder.interface";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import {
  dressingTestData,
  productTestData,
} from "../../../__test__/newOrder.test.data";
import { NewOrderValidator } from "../../../newOrder.validator";
import { VacDressing } from "../VacDressingKitMain.component";
import {
  IInputField,
  ValidationStatus,
} from "../../../../../core/interfaces/input.interface";
import { IFacility } from "../../../../manageProfile/facilityInformation/facility.interface";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../../../context/AuthContext";
import { getMockAuthContextData } from "../../../../header/__test__/authContextMockData";

const mockInputFields = (): IInputField => ({
  valid: ValidationStatus.UNTOUCHED,
  value: "",
  required: true,
  errorMessage: "",
  isDefaultValid: false,
});
describe("VAC Dressing Kit", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check header Present", () => {
    const data = getDeepClone(dressingTestData);
    const productData = getDeepClone(productTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IDressingKit) => [dt, mockSetState],
    }));
    render(
      <VacDressingKit
        data={data}
        productInfo={productData}
        setData={mockSetState}
      />
    );

    const dressingSupplies = screen.getByTestId("dressingKitHeaderTest");
    expect(dressingSupplies).toBeInTheDocument();
    expect(dressingSupplies).toHaveTextContent("3M™ V.A.C.® Dressing Kits");
  });
  it("To check subHeader Present", () => {
    const data = getDeepClone(dressingTestData);
    const productData = getDeepClone(productTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IDressingKit) => [dt, mockSetState],
    }));
    render(
      <VacDressingKit
        data={data}
        productInfo={productData}
        setData={mockSetState}
      />
    );

    const dressingSupplies = screen.getByTestId("dressingKitBodyTest");
    expect(dressingSupplies).toBeInTheDocument();
    expect(dressingSupplies).toHaveTextContent(
      "These are the default supplies selected based on your length of therapy and device."
    );
  });
  it("To check subHeader Present,readycare flag yes", () => {
    const data = getDeepClone(dressingTestData);
    const productData = getDeepClone(productTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IDressingKit) => [dt, mockSetState],
    }));
    const facility: IFacility = {
      accountId: "10987651239",
      accountName: "University Medical Center",
      typeName: "Skilled nursing facility",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      city: "Minneapolis",
      state: "MN",
      zip: 66554,
      accountNumber: 123456,
      addressId: "123",
      typeCode: "123",
      readyCareFlag: "Y",
    };
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            registeredFaciltyAddress: facility,
          }}
        >
          <VacDressingKit
            data={data}
            productInfo={productData}
            setData={mockSetState}
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("dressingKitBodyTest");
    expect(title).toBeInTheDocument();
  });

  it("To check drop Down Present", () => {
    render(
      <VacDressing
        validateAndSetData={() => {}}
        vacProducts={[]}
        handleCloseIcon={() => {}}
        validateAndSetSize={() => {}}
        showSize={true}
        vacProductSize={[]}
        showQunatity={true}
        handleVacKitDressingPlusClick={() => {}}
        handleVacKitDressingMinusClick={() => {}}
        isVacKitDressingPlusDisabled={false}
        isVacKitDressingMinusDisabled={true}
        productName={mockInputFields()}
        productSizeName={mockInputFields()}
        ProductQuantityCode={mockInputFields()}
        productLableName="productName"
        productSizeLabelName="productSizeName"
      />
    );

    const dressingSupplies = screen.getByTestId("DressingKitComponentTest");
    expect(dressingSupplies).toBeInTheDocument();
  });

  it("To check Size drop Down Present", () => {
    render(
      <VacDressing
        validateAndSetData={() => {}}
        vacProducts={[]}
        handleCloseIcon={() => {}}
        validateAndSetSize={() => {}}
        showSize={true}
        vacProductSize={[]}
        showQunatity={true}
        handleVacKitDressingPlusClick={() => {}}
        handleVacKitDressingMinusClick={() => {}}
        isVacKitDressingPlusDisabled={false}
        isVacKitDressingMinusDisabled={true}
        productName={mockInputFields()}
        productSizeName={mockInputFields()}
        ProductQuantityCode={mockInputFields()}
        productLableName="productName"
        productSizeLabelName="productSizeName"
      />
    );

    const dressingSupplies = screen.getByTestId("dressingKitSizeDropdownTest");
    expect(dressingSupplies).toBeInTheDocument();
  });

  it("To check QuantityLabel Present", () => {
    render(
      <VacDressing
        validateAndSetData={() => {}}
        vacProducts={[]}
        handleCloseIcon={() => {}}
        validateAndSetSize={() => {}}
        showSize={true}
        vacProductSize={[]}
        showQunatity={true}
        handleVacKitDressingPlusClick={() => {}}
        handleVacKitDressingMinusClick={() => {}}
        isVacKitDressingPlusDisabled={false}
        isVacKitDressingMinusDisabled={true}
        productName={mockInputFields()}
        productSizeName={mockInputFields()}
        ProductQuantityCode={mockInputFields()}
        productLableName="productName"
        productSizeLabelName="productSizeName"
      />
    );

    const dressingSupplies = screen.getByTestId("dressingKitTestQunatityLabel");
    expect(dressingSupplies).toBeInTheDocument();
  });
});
