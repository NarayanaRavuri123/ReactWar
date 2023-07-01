import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { NewOrderContext } from "../../../../context/NewOrderContext";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { getMockNewOrderData } from "../../clinicalInformation/__test__/newOrderMockContextData";
import { INewOrder } from "../../newOrder.interface";
import { NewOrderValidator } from "../../newOrder.validator";
import { newOrderTestData } from "../../__test__/newOrder.test.data";
import { SubmitPrescription } from "../submitPrescription.component";

describe("Submit Prescription component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Validate header title", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitPrescription
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("submit-prescription-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Submit a Valid Prescription");
  });

  it("Validate description title", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitPrescription
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const description = screen.getByTestId("submit-prescription-description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "A prescription signed and dated by the prescriber is required for all orders"
    );
  });

  it("Validate description print rx button", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    const mockOpenPdf = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitPrescription
          data={data}
          setData={mockSetState}
          Validator={Validator}
          openPDF={mockOpenPdf}
        />
      </MemoryRouter>
    );
    const printRxButton = screen.getByTestId("button-print-rx");
    expect(printRxButton).toBeInTheDocument();
    expect(printRxButton).toHaveTextContent("Print Rx");
    fireEvent.click(printRxButton);
    expect(mockOpenPdf).toHaveBeenCalled();
    expect(mockOpenPdf).toBeCalledTimes(1);
  });

  it("Validate prescription first option E-Prescription", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitPrescription
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const radioButton = screen.getByTestId(
      "test-EPrescription"
    ) as HTMLButtonElement;
    const title = screen.getByTestId("E-Prescription");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("E-Prescription");
    const description = screen.getByTestId(
      "A DocuSign email will be sent to the prescriber requesting an electronically signed prescription"
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "A DocuSign email will be sent to the prescriber requesting an electronically signed prescription"
    );
    fireEvent.click(radioButton);
    expect(mockSetState).toHaveBeenCalled();
    expect(mockSetState).toBeCalledTimes(2);
  });

  it("Validate prescription second option Rx Upload", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitPrescription
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const radioButton = screen.getByTestId("test-RxImage") as HTMLButtonElement;
    const title = screen.getByTestId("Rx Upload");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Rx Upload");
    const description = screen.getByTestId(
      "Attach the prescription to this order by using the scan icon (additional documents may be included)"
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "Attach the prescription to this order by using the scan icon (additional documents may be included)"
    );
    fireEvent.click(radioButton);
    expect(mockSetState).toHaveBeenCalled();
    expect(mockSetState).toBeCalledTimes(2);
  });

  it("Validate prescription third option Fax in Later", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitPrescription
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const radioButton = screen.getByTestId("test-Fax") as HTMLButtonElement;
    const title = screen.getByTestId("Fax in Later");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Fax in Later");
    const description = screen.getByTestId(
      "After submitting this order, please fax the prescription and other clinical documents to"
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "After submitting this order, please fax the prescription and other clinical documents to"
    );
    fireEvent.click(radioButton);
    expect(mockSetState).toHaveBeenCalled();
    expect(mockSetState).toBeCalledTimes(2);
  });

  it("check if prescriberInfo error compnent present", () => {
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
        }}
      >
        <SubmitPrescription
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const label = screen.getByTestId("prescriberErrorDescLabelTest");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent(
      "To use E-Prescription, you need to select a prescriber"
    );
  });

  it("check if prescriberInfo btn link is present", () => {
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
        }}
      >
        <SubmitPrescription
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const label = screen.getByTestId(
      "prescriber-selected-addOrRemove-button-prescribersearch-test"
    );
    expect(label).toBeInTheDocument();
  });

  it("check if prescriberInfo selected compnent present", () => {
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
        }}
      >
        <SubmitPrescription
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const label = screen.getByTestId("prescriberInfoLabelSelectedTest");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Prescriber Name");
  });

  it("check if prescriberInfo selected email label present", () => {
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
        }}
      >
        <SubmitPrescription
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const label = screen.getByTestId("prescriberInfoLabelSelectedEmailTest");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Prescriber Email");
  });
});
