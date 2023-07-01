import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { PrescriberInformationReviewOrder } from "../prescriberInformationReviewOrder.component";
import { IPrescriberModal } from "../../prescriberSearch/prescriberSearch.model";

describe("Prescriber information review order component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Prescriber information review order component validate header", () => {
    const data: IPrescriberModal = {
      firstName: "Rahul",
      lastName: "Patil",
      npi: "12345",
      city: "San Antonio",
      state: "TX",
      telephoneNumber: "832-940-5422",
      zipCode: "66554",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      faxNumber: null,
      email: "rahul@gmail.com",
    };
    const editBtnAction = jest.fn();
    render(
      <PrescriberInformationReviewOrder
        data={data}
        editButtonClicked={editBtnAction}
      />
    );
    const title = screen.getByTestId(
      "prescriber-information-review-order-title"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Prescriber Information");
    const editBtn = screen.getByTestId(
      "prescriber-information-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Prescriber information review order component validate prescriber name", () => {
    const data: IPrescriberModal = {
      firstName: "Rahul",
      lastName: "Patil",
      npi: "12345",
      city: "San Antonio",
      state: "TX",
      telephoneNumber: "832-940-5422",
      zipCode: "66554",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      faxNumber: null,
      email: "rahul@gmail.com",
    };
    render(
      <PrescriberInformationReviewOrder
        data={data}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("prescriber-name");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Prescriber Name");
    const value1 = screen.getByTestId("prescriber-name-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("Rahul Patil");
  });

  it("Prescriber information review order component validate npi", () => {
    const data: IPrescriberModal = {
      firstName: "Rahul",
      lastName: "Patil",
      npi: "12345",
      city: "San Antonio",
      state: "TX",
      telephoneNumber: "832-940-5422",
      zipCode: "66554",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      faxNumber: null,
      email: "rahul@gmail.com",
    };
    render(
      <PrescriberInformationReviewOrder
        data={data}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("npi");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("NPI");
    const value1 = screen.getByTestId("npi-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("12345");
  });

  it("Prescriber information review order component validate phone number", () => {
    const data: IPrescriberModal = {
      firstName: "Rahul",
      lastName: "Patil",
      npi: "12345",
      city: "San Antonio",
      state: "TX",
      telephoneNumber: "832-940-5422",
      zipCode: "66554",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      faxNumber: null,
      email: "rahul@gmail.com",
    };
    render(
      <PrescriberInformationReviewOrder
        data={data}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("phone");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Phone Number");
    const value1 = screen.getByTestId("phone-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("832-940-5422");
  });

  it("Prescriber information review order component validate fax number", () => {
    const data: IPrescriberModal = {
      firstName: "Rahul",
      lastName: "Patil",
      npi: "12345",
      city: "San Antonio",
      state: "TX",
      telephoneNumber: "832-940-5422",
      zipCode: "66554",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      faxNumber: "1234567",
      email: "rahul@gmail.com",
    };
    render(
      <PrescriberInformationReviewOrder
        data={data}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("Fax");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Fax Number");
    const value1 = screen.getByTestId("fax-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("1234567");
  });

  it("Prescriber information review order component validate email", () => {
    const data: IPrescriberModal = {
      firstName: "Rahul",
      lastName: "Patil",
      npi: "12345",
      city: "San Antonio",
      state: "TX",
      telephoneNumber: "832-940-5422",
      zipCode: "66554",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      faxNumber: null,
      email: "rahul@gmail.com",
    };
    render(
      <PrescriberInformationReviewOrder
        data={data}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("email");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Email");
    const value1 = screen.getByTestId("email-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("Rahul@gmail.com");
  });

  it("Prescriber information review order component validate email with null value", () => {
    const data: IPrescriberModal = {
      firstName: "Rahul",
      lastName: "Patil",
      npi: "12345",
      city: "San Antonio",
      state: "TX",
      telephoneNumber: "832-940-5422",
      zipCode: "66554",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      faxNumber: null,
      email: null,
    };
    render(
      <PrescriberInformationReviewOrder
        data={data}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("email");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Email");
    const value1 = screen.getByTestId("email-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("--");
  });

  it("Prescriber information review order component validate address", () => {
    const data: IPrescriberModal = {
      firstName: "Rahul",
      lastName: "Patil",
      npi: "12345",
      city: "San Antonio",
      state: "TX",
      telephoneNumber: "832-940-5422",
      zipCode: "66554",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      faxNumber: null,
      email: "rahul@gmail.com",
    };
    render(
      <PrescriberInformationReviewOrder
        data={data}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("address");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Address");
    const value1 = screen.getByTestId("address1-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("1800 17th Ave Se");
    const value2 = screen.getByTestId("address2-value");
    expect(value2).toBeInTheDocument();
    expect(value2).toHaveTextContent("Apt 405");
    const value3 = screen.getByTestId("city-state-zip-value");
    expect(value3).toBeInTheDocument();
    expect(value3).toHaveTextContent("San Antonio, TX 66554");
  });
});
