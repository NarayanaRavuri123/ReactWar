import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { NewOrderContext } from "../../../../../context/NewOrderContext";
import { ValidationStatus } from "../../../../../core/interfaces/input.interface";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { getMockNewOrderData } from "../../../clinicalInformation/__test__/newOrderMockContextData";
import { INewOrder } from "../../../newOrder.interface";
import { NewOrderValidator } from "../../../newOrder.validator";
import { IPrescriberModal } from "../../../prescriberInformation/prescriberSearch/prescriberSearch.model";
import { newOrderTestData } from "../../../__test__/newOrder.test.data";
import { EPrescription } from "../ePrescription.component";

describe("E Prescription component", () => {
  afterAll(() => {
    cleanup();
  });

  it("check update email textbox button present", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
          showPrescriberUpdateEmail: true,
        }}
      >
        <EPrescription
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const label = screen.getByTestId("update-prescriberemail-input-test");
    expect(label).toBeInTheDocument();
  });

  it("check update button is present", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
          showPrescriberUpdateEmail: true,
        }}
      >
        <EPrescription
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const label = screen.getByTestId("button-update-email-test");
    expect(label).toBeInTheDocument();
  });

  it("check if crossIcon is Present", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
          showPrescriberUpdateEmail: true,
        }}
      >
        <EPrescription
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const label = screen.getByTestId("crossIconTest");
    expect(label).toBeInTheDocument();
  });
  it("check if E-script value No the error msg presenr or not", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    const prescriber: IPrescriberModal = {
      firstName: "",
      lastName: "",
      npi: "",
      city: "",
      state: "",
      telephoneNumber: "",
      zipCode: "",
      address1: "",
      address2: "",
      faxNumber: "",
      email: "",
      eScript: "No",
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
          isPrescriberAddedOpenInfo: true,
          prescriberList: prescriber,
        }}
      >
        <EPrescription
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const errormsg = screen.getByTestId("prescriberErrorDesc2LabelTest");
    expect(errormsg).toBeInTheDocument();
  });
  it("check if E-script value No the emailfield present or not", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    const prescriber: IPrescriberModal = {
      firstName: "",
      lastName: "",
      npi: "",
      city: "",
      state: "",
      telephoneNumber: "",
      zipCode: "",
      address1: "",
      address2: "",
      faxNumber: "",
      email: "",
      eScript: "No",
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
          isPrescriberAddedOpenInfo: true,
          prescriberList: prescriber,
        }}
      >
        <EPrescription
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const email = screen.getByTestId(
      "prescriber-selected-addOrRemove-button-email-test"
    );
    expect(email).toBeInTheDocument();
  });
  it("check if Email does not present the error msg presenr or not", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    data.updatedPrescriberEmail.valid = ValidationStatus.INVALID;
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
          isPrescriberAddedOpenInfo: true,
        }}
      >
        <EPrescription
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const mailerror = screen.getByTestId("prescriberEmailError");
    expect(mailerror).toBeInTheDocument();
    expect(mailerror).toHaveTextContent("Prescriber email address required");
  });
});
