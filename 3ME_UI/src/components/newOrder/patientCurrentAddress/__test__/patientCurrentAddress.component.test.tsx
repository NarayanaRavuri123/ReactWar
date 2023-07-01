import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { PatientCurrentAddress } from "../patientCurrentAddress.component";
import { INewOrder } from "../../newOrder.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { newOrderTestData } from "../../__test__/newOrder.test.data";
import { NewOrderValidator } from "../../newOrder.validator";
import userEvent from "@testing-library/user-event";

describe("Patient Current Address", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Patient Current Address Present", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();

    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);

    render(
      <PatientCurrentAddress
        data={data}
        setData={mockSetState}
        states={[]}
        statesText={[]}
      />
    );

    const patientCurrentAddressTitle = screen.getByTestId(
      "patientCurrentAddressHeaderTest"
    );
    expect(patientCurrentAddressTitle).toBeInTheDocument();
    expect(patientCurrentAddressTitle).toHaveTextContent(
      "Patient’s Current Address"
    );
  });
  it("To check Patient Current Address Desc Present", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();

    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);

    render(
      <PatientCurrentAddress
        data={data}
        setData={mockSetState}
        states={[]}
        statesText={[]}
      />
    );

    const patientCurrentAddressTitle = screen.getByTestId(
      "patientCurrentAddressDescTest"
    );
    expect(patientCurrentAddressTitle).toBeInTheDocument();
  });

  it("same as permanent Checkbox to be  Present", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <PatientCurrentAddress
        data={data}
        setData={mockSetState}
        states={[]}
        statesText={[]}
      />
    );
    const patientCurrentAddressChkBoxDiv = screen.getByTestId(
      "patientCurrentAddressCheckBoxTest"
    );
    expect(patientCurrentAddressChkBoxDiv).toBeInTheDocument();
  });

  it("Patient Current Address1 should match the value provided", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();

    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);

    render(
      <PatientCurrentAddress
        data={data}
        setData={mockSetState}
        states={[]}
        statesText={[]}
      />
    );
    const patientCurrentAddressChkBoxDiv = screen.getByTestId(
      "patientCurrentAddressCheckBoxTest"
    );
    userEvent.click(patientCurrentAddressChkBoxDiv);

    const Address1Div = screen.getByTestId("patientCurrentAddress1Test");
    userEvent.type(Address1Div, "Rece");
    expect(mockSetState).toHaveBeenCalled();
  });
  it("Patient Current Address2 should match the value provided", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();

    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);

    render(
      <PatientCurrentAddress
        data={data}
        setData={mockSetState}
        states={[]}
        statesText={[]}
      />
    );
    const patientCurrentAddressChkBoxDiv = screen.getByTestId(
      "patientCurrentAddressCheckBoxTest"
    );
    userEvent.click(patientCurrentAddressChkBoxDiv);
    const Address2Div = screen.getByTestId("patientCurrentAddress2Test");
    userEvent.type(Address2Div, "Jones");
    expect(mockSetState).toHaveBeenCalled();
  });

  it("patient current address city match the value provided", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();

    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);

    render(
      <PatientCurrentAddress
        data={data}
        setData={mockSetState}
        states={[]}
        statesText={[]}
      />
    );
    const patientCurrentAddressChkBoxDiv = screen.getByTestId(
      "patientCurrentAddressCheckBoxTest"
    );
    userEvent.click(patientCurrentAddressChkBoxDiv);
    const cityDiv = screen.getByTestId("patientCurrentAddressCityTest");
    userEvent.type(cityDiv, "cad");
    expect(mockSetState).toHaveBeenCalled();
  });
  it("patient current address ZipCode match the value provided", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();

    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);

    render(
      <PatientCurrentAddress
        data={data}
        setData={mockSetState}
        states={[]}
        statesText={[]}
      />
    );
    const patientCurrentAddressChkBoxDiv = screen.getByTestId(
      "patientCurrentAddressCheckBoxTest"
    );
    userEvent.click(patientCurrentAddressChkBoxDiv);
    const firstNameDiv = screen.getByTestId("patientCurrentAddressZipTest");
    userEvent.type(firstNameDiv, "34567");
    expect(mockSetState).toHaveBeenCalled();
  });
});
