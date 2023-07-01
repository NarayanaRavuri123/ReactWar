import React from "react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { INewOrder } from "../../newOrder.interface";
import { NewOrderValidator } from "../../newOrder.validator";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { cleanup, render, screen } from "@testing-library/react";
import { newOrderTestData } from "../../__test__/newOrder.test.data";
import { DeliveryInformation } from "../deliveryInformation.component";
import { defaultDeliveryInformation } from "../../newOrder.model";
jest.mock("../../../../core/popup/popup.component");

describe("Delivery Information component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Delivery Information validate title", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const title = screen.getByTestId("delivery-information-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Delivery Information");
  });
  it("Delivery Information ToolTip Present", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const other = screen.getByTestId("deliveryInfoTooltipTest");
    expect(other).toBeInTheDocument();
  });

  it("Product Need By Date validate", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const title = screen.getByTestId("delivery-information-product-need-date");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Product Need By Date*");
  });

  it("Need by Time validate", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const title = screen.getByTestId("delivery-information-need-by-time");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Need by Time*");
  });

  it("Delivery Site Type validate", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const title = screen.getByTestId("delivery-information-delivery-site-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Delivery Site Type*");
  });

  it("Validate Facility Name with valid detail", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DeliveryInformation
          data={data}
          setData={mockSetState}
          Validator={Validator}
          states={[]}
          statesText={[]}
          nextOrderOpen={false}
          deliveryInformation={defaultDeliveryInformation}
          setDeliveryInformation={mockSetState}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("delivery-information-facilityName");
    expect(title).toHaveTextContent("Facility Name*");
    const addressline1 = screen.getByTestId(
      "delivery-information-facilityName-value"
    ) as HTMLInputElement;
    userEvent.type(addressline1, "Rahul");
    expect(addressline1).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
  });

  it("Validate Facility Name with empty", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const title = screen.getByTestId("delivery-information-facilityName");
    expect(title).toHaveTextContent("Facility Name*");
    const addressline2 = screen.getByTestId(
      "delivery-information-facilityName-value"
    ) as HTMLBaseElement;
    userEvent.type(addressline2, "");
    expect(addressline2).toBeInTheDocument();
    expect(addressline2).toHaveTextContent("");
  });

  it("Validate Facility Name with invalid detail", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const title = screen.getByTestId("delivery-information-facilityName");
    expect(title).toHaveTextContent("Facility Name*");
    const addressline1 = screen.getByTestId(
      "delivery-information-facilityName-value"
    ) as HTMLBaseElement;
    userEvent.type(addressline1, "Rahul$123");
    expect(addressline1).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
    const error = title.getElementsByClassName("Mui-error");
    expect(error).toBeTruthy();
  });

  it("Validate Addressline 1 with valid detail", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DeliveryInformation
          data={data}
          setData={mockSetState}
          Validator={Validator}
          states={[]}
          statesText={[]}
          nextOrderOpen={false}
          deliveryInformation={defaultDeliveryInformation}
          setDeliveryInformation={mockSetState}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("delivery-information-addressline1");
    expect(title).toHaveTextContent("Address Line 1 (No P.O. Boxes)*");
    const addressline1 = screen.getByTestId(
      "delivery-information-addressline1-value"
    ) as HTMLInputElement;
    userEvent.type(
      addressline1,
      "Healthasyst 123 3rd Floor Near Domlur flyover Domlur"
    );
    expect(addressline1).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
  });

  it("Validate Addressline 1 with empty", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const title = screen.getByTestId("delivery-information-addressline1");
    expect(title).toHaveTextContent("Address Line 1 (No P.O. Boxes)*");
    const addressline2 = screen.getByTestId(
      "delivery-information-addressline1-value"
    ) as HTMLBaseElement;
    userEvent.type(addressline2, "");
    expect(addressline2).toBeInTheDocument();
    expect(addressline2).toHaveTextContent("");
  });

  it("Validate Addressline 1 with invalid detail", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const title = screen.getByTestId("delivery-information-addressline1");
    expect(title).toHaveTextContent("Address Line 1 (No P.O. Boxes)*");
    const addressline1 = screen.getByTestId(
      "delivery-information-addressline1-value"
    ) as HTMLBaseElement;
    userEvent.type(
      addressline1,
      "Healthasyst, #123, 3rd Floor, Near Domlur flyover, Domlur"
    );
    expect(addressline1).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
    const error = title.getElementsByClassName("Mui-error");
    expect(error).toBeTruthy();
  });

  it("Validate Addressline 2 with valid detail", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const title = screen.getByTestId("delivery-information-addressline2");
    expect(title).toHaveTextContent("Address Line 2");
    const addressline2 = screen.getByTestId(
      "delivery-information-addressline2-value"
    ) as HTMLBaseElement;
    userEvent.type(
      addressline2,
      "Healthasyst 123 3rd Floor Near Domlur flyover Domlur"
    );
    expect(addressline2).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
  });

  it("Validate Addressline 2 with empty", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const title = screen.getByTestId("delivery-information-addressline2");
    expect(title).toHaveTextContent("Address Line 2");
    const addressline2 = screen.getByTestId(
      "delivery-information-addressline2-value"
    ) as HTMLBaseElement;
    userEvent.type(addressline2, "");
    expect(addressline2).toBeInTheDocument();
    expect(addressline2).toHaveTextContent("");
  });

  it("Validate Addressline 2 with invalid detail", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const title = screen.getByTestId("delivery-information-addressline2");
    expect(title).toHaveTextContent("Address Line 2");
    const addressline2 = screen.getByTestId(
      "delivery-information-addressline2-value"
    ) as HTMLBaseElement;
    userEvent.type(
      addressline2,
      "Healthasyst, #123, 3rd Floor, Near Domlur flyover, Domlur"
    );
    expect(addressline2).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
    const error = title.getElementsByClassName("Mui-error");
    expect(error).toBeTruthy();
  });

  it("Validate City with valid detail", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const title = screen.getByTestId("delivery-information-city");
    expect(title).toHaveTextContent("City*");
    const city = screen.getByTestId(
      "delivery-information-city-value"
    ) as HTMLBaseElement;
    userEvent.type(city, "Bangalore");
    expect(city).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
  });

  it("Validate City with invalid detail", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const title = screen.getByTestId("delivery-information-city");
    expect(title).toHaveTextContent("City*");
    const city = screen.getByTestId(
      "delivery-information-city-value"
    ) as HTMLBaseElement;
    userEvent.type(city, "Bangalore1");
    expect(city).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
    const error = title.getElementsByClassName("Mui-error");
    expect(error).toBeTruthy();
  });

  it("Validate Zip Code with valid detail", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const title = screen.getByTestId("delivery-information-zip-code");
    expect(title).toHaveTextContent("ZIP Code*");
    const zipCode = screen.getByTestId(
      "delivery-information-zip-code-value"
    ) as HTMLBaseElement;
    userEvent.type(zipCode, "12345");
    expect(zipCode).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
  });

  it("Validate Zip Code with less than 5 number", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const title = screen.getByTestId("delivery-information-zip-code");
    expect(title).toHaveTextContent("ZIP Code*");
    const zipCode = screen.getByTestId(
      "delivery-information-zip-code-value"
    ) as HTMLBaseElement;
    userEvent.type(zipCode, "123");
    expect(zipCode).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
    const error = title.getElementsByClassName("Mui-error");
    expect(error).toBeTruthy();
  });

  it("Validate Zip Code with greater than 5 number", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const title = screen.getByTestId("delivery-information-zip-code");
    expect(title).toHaveTextContent("ZIP Code*");
    const zipCode = screen.getByTestId(
      "delivery-information-zip-code-value"
    ) as HTMLBaseElement;
    userEvent.type(zipCode, "123456");
    expect(zipCode).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
    const error = title.getElementsByClassName("Mui-error");
    expect(error).toBeTruthy();
  });

  it("Validate Zip Code with invalid data", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DeliveryInformation
        data={data}
        setData={mockSetState}
        Validator={Validator}
        states={[]}
        statesText={[]}
        nextOrderOpen={false}
        deliveryInformation={defaultDeliveryInformation}
        setDeliveryInformation={mockSetState}
      />
    );
    const title = screen.getByTestId("delivery-information-zip-code");
    expect(title).toHaveTextContent("ZIP Code*");
    const zipCode = screen.getByTestId(
      "delivery-information-zip-code-value"
    ) as HTMLBaseElement;
    userEvent.type(zipCode, "Abc12");
    expect(zipCode).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
    const error = title.getElementsByClassName("Mui-error");
    expect(error).toBeTruthy();
  });
});
