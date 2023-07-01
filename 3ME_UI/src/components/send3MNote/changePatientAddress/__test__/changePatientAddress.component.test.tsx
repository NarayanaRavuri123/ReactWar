import React from "react";
import { MemoryRouter } from "react-router-dom";
import ChangeAddress from "../changeAddress.component";
import { IChangeAddress } from "../changeAddress.interface";
import { SendNoteValidator } from "../../sendNote.validator";
import { Validator } from "../../../../util/order.validations";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { cleanup, render, screen } from "@testing-library/react";
import {
  changeAddressTestData,
  patientMockAddress,
} from "./changeAddress.test.data";

describe("Change Patient Address  component", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Address Type header validation", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(changeAddressTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IChangeAddress) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeAddress data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("address-to-change");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Address to change");
  });
  it("To check Patient Address header validation", () => {
    const data = getDeepClone(changeAddressTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IChangeAddress) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeAddress data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("address-info-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Patient’s New Address");
  });

  it("To check Patient Address line 1 header validation", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(changeAddressTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IChangeAddress) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeAddress data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("addressline1-input-label");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Address Line 1 (No P.O. Boxes)");
  });
  it("To check Patient Address line 2 header validation", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(changeAddressTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IChangeAddress) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeAddress data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("addressline2-input-label");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Address Line 2");
  });
  it("To check City header validation", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(changeAddressTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IChangeAddress) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeAddress data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("city-input-label");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("City");
  });
  it("To check State header validation", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(changeAddressTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IChangeAddress) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeAddress data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("state-label");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("State");
  });
  it("Validate phone number", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(changeAddressTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IChangeAddress) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeAddress data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("phone-input-label");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Phone Number");
  });
  it("To check Zip Code header validation", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(changeAddressTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IChangeAddress) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeAddress data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("zip-input-label");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("ZIP Code");
  });
  it("To check Comment header validation", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(changeAddressTestData);
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeAddress data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("comment-input-label");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Comment");
  });

  it("Validate permanent address", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(changeAddressTestData);
    const permanentAddress = getDeepClone(patientMockAddress);
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeAddress
          data={data}
          setData={() => {}}
          permanentAddress={permanentAddress}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("permanent-address-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Patient’s Permanent Address");
    const addressline1 = screen.getByTestId("permanent-address-line1");
    expect(addressline1).toBeInTheDocument();
    expect(addressline1).toHaveTextContent("Test Addressline1");
    const addressline2 = screen.getByTestId("permanent-address-line2");
    expect(addressline2).toBeInTheDocument();
    expect(addressline2).toHaveTextContent("Test Addressline2");
    const cityStateZip = screen.getByTestId("permanent-address-city-state-zip");
    expect(cityStateZip).toBeInTheDocument();
    expect(cityStateZip).toHaveTextContent("Bangalore, Karnataka 12345");
  });

  it("Validate current address", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(changeAddressTestData);
    const currentAddress = getDeepClone(patientMockAddress);

    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeAddress
          data={data}
          setData={() => {}}
          currentAddress={currentAddress}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("current-address-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Patient’s Current Address");
    const addressline1 = screen.getByTestId("current-address-line1");
    expect(addressline1).toBeInTheDocument();
    expect(addressline1).toHaveTextContent("Test Addressline1");
    const addressline2 = screen.getByTestId("current-address-line2");
    expect(addressline2).toBeInTheDocument();
    expect(addressline2).toHaveTextContent("Test Addressline2");
    const cityStateZip = screen.getByTestId("current-address-city-state-zip");
    expect(cityStateZip).toBeInTheDocument();
    expect(cityStateZip).toHaveTextContent("Bangalore, Karnataka 12345");
  });
});
