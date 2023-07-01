import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import {
  IInputField,
  ValidationStatus,
} from "../../../../../core/interfaces/input.interface";
import { AddFacilityManually } from "../addFacilityManually.component";
import { IAddFacility } from "../addFacilityManually.interface";

describe("Add Facility Manually ", () => {
  afterAll(() => {
    cleanup();
  });

  it("Validate Add Facility Manually header", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityManually redirectHandler={spyFn} addNewFacility={spyFn} />
      </MemoryRouter>
    );
    const header = screen.getByTestId("add-facility-manually-title");
    expect(header).toHaveTextContent("Add Facility Manually");
  });

  it("Validate Add Facility Manually Facity Name with detail", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityManually redirectHandler={spyFn} addNewFacility={spyFn} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-name-title-manual");
    expect(title).toHaveTextContent("Facility Name*");
    const facilityName = screen.getByTestId(
      "facility-name-manual"
    ) as HTMLBaseElement;
    userEvent.type(facilityName, "Acelity");
    expect(facilityName).toBeInTheDocument();
    expect(facilityName).toHaveValue("Acelity");
    expect(title).toHaveStyle("color: rgb(25, 118, 210)");
  });

  it("Validate Add Facility Manually Facity Name with invalid detail", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityManually redirectHandler={spyFn} addNewFacility={spyFn} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-name-title-manual");
    expect(title).toHaveTextContent("Facility Name*");
    const facilityName = screen.getByTestId(
      "facility-name-manual"
    ) as HTMLBaseElement;
    userEvent.type(facilityName, "Acelity@123");
    expect(facilityName).toBeInTheDocument();
    expect(facilityName).toHaveValue("Acelity@123");
    expect(title).toHaveStyle("color: rgb(211, 47, 47)");
  });

  it("Validate Add Facility Manually Facity Addressline 1 with valid detail", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityManually redirectHandler={spyFn} addNewFacility={spyFn} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-addressline1-title-manual");
    expect(title).toHaveTextContent("Address Line 1*");
    const addressline1 = screen.getByTestId(
      "facility-addressline1-manual"
    ) as HTMLBaseElement;
    userEvent.type(
      addressline1,
      "Healthasyst 123 3rd Floor Near Domlur flyover Domlur"
    );
    expect(addressline1).toBeInTheDocument();
    expect(addressline1).toHaveValue(
      "Healthasyst 123 3rd Floor Near Domlur flyover Domlur"
    );
    expect(title).toHaveStyle("color: rgb(25, 118, 210)");
  });

  it("Validate Add Facility Manually Facity Addressline 1 with invalid detail", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityManually redirectHandler={spyFn} addNewFacility={spyFn} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-addressline1-title-manual");
    expect(title).toHaveTextContent("Address Line 1*");
    const addressline1 = screen.getByTestId(
      "facility-addressline1-manual"
    ) as HTMLBaseElement;
    userEvent.type(
      addressline1,
      "Healthasyst, #123, 3rd Floor, Near Domlur flyover, Domlur"
    );
    expect(addressline1).toBeInTheDocument();
    expect(addressline1).toHaveValue(
      "Healthasyst, #123, 3rd Floor, Near Domlur flyover, Domlur"
    );
    expect(title).toHaveStyle("color: rgb(211, 47, 47)");
  });

  it("Validate Add Facility Manually Facity Addressline 2 with valid detail", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityManually redirectHandler={spyFn} addNewFacility={spyFn} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-addressline2-title-manual");
    expect(title).toHaveTextContent("Address Line 2");
    const addressline2 = screen.getByTestId(
      "facility-addressline2-manual"
    ) as HTMLBaseElement;
    userEvent.type(
      addressline2,
      "Healthasyst 123 3rd Floor Near Domlur flyover Domlur"
    );
    expect(addressline2).toBeInTheDocument();
    expect(addressline2).toHaveValue(
      "Healthasyst 123 3rd Floor Near Domlur flyover Domlur"
    );
    expect(title).toHaveStyle("color: rgb(25, 118, 210)");
  });

  it("Validate Add Facility Manually Facity Addressline 2 with empty", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityManually redirectHandler={spyFn} addNewFacility={spyFn} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-addressline2-title-manual");
    expect(title).toHaveTextContent("Address Line 2");
    const addressline2 = screen.getByTestId(
      "facility-addressline2-manual"
    ) as HTMLBaseElement;
    userEvent.type(addressline2, "");
    expect(addressline2).toBeInTheDocument();
    expect(addressline2).toHaveTextContent("");
  });

  it("Validate Add Facility Manually Facity Addressline 2 with invalid detail", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityManually redirectHandler={spyFn} addNewFacility={spyFn} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-addressline2-title-manual");
    expect(title).toHaveTextContent("Address Line 2");
    const addressline2 = screen.getByTestId(
      "facility-addressline2-manual"
    ) as HTMLBaseElement;
    userEvent.type(
      addressline2,
      "Healthasyst, #123, 3rd Floor, Near Domlur flyover, Domlur"
    );
    expect(addressline2).toBeInTheDocument();
    expect(addressline2).toHaveValue(
      "Healthasyst, #123, 3rd Floor, Near Domlur flyover, Domlur"
    );
    expect(title).toHaveStyle("color: rgb(211, 47, 47)");
  });

  it("Validate Add Facility Manually Facity City with valid detail", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityManually redirectHandler={spyFn} addNewFacility={spyFn} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-city-title-manual");
    expect(title).toHaveTextContent("City*");
    const city = screen.getByTestId("facility-city-manual") as HTMLBaseElement;
    userEvent.type(city, "Bangalore");
    expect(city).toBeInTheDocument();
    expect(city).toHaveValue("Bangalore");
    expect(title).toHaveStyle("color: rgb(25, 118, 210)");
  });

  it("Validate Add Facility Manually Facity City with invalid detail", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityManually redirectHandler={spyFn} addNewFacility={spyFn} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-city-title-manual");
    expect(title).toHaveTextContent("City*");
    const city = screen.getByTestId("facility-city-manual") as HTMLBaseElement;
    userEvent.type(city, "Bangalore1");
    expect(city).toBeInTheDocument();
    expect(city).toHaveValue("Bangalore1");
    expect(title).toHaveStyle("color: rgb(211, 47, 47)");
  });

  it("Validate Add Facility Manually Facity Zip Code with valid detail", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityManually redirectHandler={spyFn} addNewFacility={spyFn} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-zipcode-title-manual");
    expect(title).toHaveTextContent("ZIP Code*");
    const city = screen.getByTestId(
      "facility-zipcode-manual"
    ) as HTMLBaseElement;
    userEvent.type(city, "12345");
    expect(city).toBeInTheDocument();
    expect(city).toHaveValue("12345");
    expect(title).toHaveStyle("color: rgb(25, 118, 210)");
  });

  it("Validate Add Facility Manually Facity Zip Code with less than 5 number", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityManually redirectHandler={spyFn} addNewFacility={spyFn} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-zipcode-title-manual");
    expect(title).toHaveTextContent("ZIP Code*");
    const city = screen.getByTestId(
      "facility-zipcode-manual"
    ) as HTMLBaseElement;
    userEvent.type(city, "123");
    expect(city).toBeInTheDocument();
    expect(city).toHaveValue("123");
    expect(title).toHaveStyle("color: rgb(211, 47, 47)");
  });

  it("Validate Add Facility Manually Facity Zip Code with greater than 5 number", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityManually redirectHandler={spyFn} addNewFacility={spyFn} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-zipcode-title-manual");
    expect(title).toHaveTextContent("ZIP Code*");
    const city = screen.getByTestId(
      "facility-zipcode-manual"
    ) as HTMLBaseElement;
    userEvent.type(city, "123456");
    expect(city).toBeInTheDocument();
    expect(city).toHaveValue("123456");
    expect(title).toHaveStyle("color: rgb(211, 47, 47)");
  });

  it("Validate Add Facility Manually Facity Zip Code with invalid data", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityManually redirectHandler={spyFn} addNewFacility={spyFn} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-zipcode-title-manual");
    expect(title).toHaveTextContent("ZIP Code*");
    const city = screen.getByTestId(
      "facility-zipcode-manual"
    ) as HTMLBaseElement;
    userEvent.type(city, "Abc12");
    expect(city).toBeInTheDocument();
    expect(city).toHaveValue("Abc12");
    expect(title).toHaveStyle("color: rgb(211, 47, 47)");
  });

  it("Validate Add Facility Manually Facity search button when valid data", () => {
    let mockInputValues: IInputField = {
      value: "test",
      valid: ValidationStatus.VALID,
    };
    let localCopy: IAddFacility = {
      name: {
        value: "Facilty Name",
        valid: ValidationStatus.VALID,
      },
      type: {
        value: "Hospital",
        valid: ValidationStatus.VALID,
      },
      addressLine1: {
        value: "4th Cross Road, Shivanagar",
        valid: ValidationStatus.VALID,
      },
      addressLine2: {
        value: "Rajajinagar",
        valid: ValidationStatus.VALID,
      },
      city: {
        value: "Banglore",
        valid: ValidationStatus.VALID,
      },
      state: {
        value: "Texas",
        valid: ValidationStatus.VALID,
      },
      zipCode: {
        value: "56001",
        valid: ValidationStatus.VALID,
      },
      typeCode: {
        value: "20",
        valid: ValidationStatus.VALID,
      },
      facilityMode: {
        value: "1",
        valid: ValidationStatus.VALID,
      },
      siteUseId: {
        valid: ValidationStatus.VALID,
        value: "23421",
      },
    };
    const addNewFacilitySpyFn = jest.fn();
    const redirectHandlerSpyFn = jest.fn();
    // @ts-ignore
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityManually
          addNewFacility={addNewFacilitySpyFn}
          facilityData={localCopy}
          redirectHandler={redirectHandlerSpyFn}
        />
      </MemoryRouter>
    );
    const enterButton = screen.getByTestId("enter-button");
    expect(enterButton).toBeEnabled();
  });

  it("Validate Add Facility Manually Facity search button when invalid data", () => {
    let mockInputValues: IInputField = {
      value: "test",
      valid: ValidationStatus.VALID,
    };
    let localCopy: IAddFacility = {
      name: {
        value: "Facilty Name",
        valid: ValidationStatus.VALID,
      },
      type: {
        value: "Hospital",
        valid: ValidationStatus.VALID,
      },
      addressLine1: {
        value: "4th Cross Road, Shivanagar",
        valid: ValidationStatus.INVALID,
      },
      addressLine2: {
        value: "Rajajinagar",
        valid: ValidationStatus.VALID,
      },
      city: {
        value: "Banglore",
        valid: ValidationStatus.VALID,
      },
      state: {
        value: "Texas",
        valid: ValidationStatus.VALID,
      },
      zipCode: {
        value: "56001",
        valid: ValidationStatus.VALID,
      },
      typeCode: {
        value: "20",
        valid: ValidationStatus.VALID,
      },
      facilityMode: {
        value: "1",
        valid: ValidationStatus.VALID,
      },
      siteUseId: {
        valid: ValidationStatus.VALID,
        value: "23432",
      },
    };
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AddFacilityManually
          addNewFacility={spyFn}
          facilityData={localCopy}
          redirectHandler={spyFn}
        />
      </MemoryRouter>
    );
    const enterButton = screen.getByTestId("enter-button");
    expect(enterButton).not.toBeEnabled();
  });
});
