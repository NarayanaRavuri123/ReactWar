import React from "react";
import { MemoryRouter } from "react-router-dom";
import TransferPatient from "../transferPatient.component";
import { SendNoteValidator } from "../../sendNote.validator";
import { Validator } from "../../../../util/order.validations";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { ITransferPatient } from "../transferPatient.interface";
import { cleanup, render, screen } from "@testing-library/react";
import { transferPatientTestData } from "./transferPatient.test.data";

describe("Transfer Patient component", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Last Visit date for Patient header validation", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(transferPatientTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ITransferPatient) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TransferPatient data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("last-visit-date-label");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Last visit date for patient");
  });
  it("To check Transfer Details header validation", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(transferPatientTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ITransferPatient) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TransferPatient data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("transfer-details-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Transfer Details");
  });
  it("To check Transfer Details content validation", () => {
    const data = getDeepClone(transferPatientTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ITransferPatient) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TransferPatient data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("transfer-details-description");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Please provide all information available. Please use comments to provide more detail (like address, phone number, contact name, etc.)"
    );
  });

  it("To check facility name header validation", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(transferPatientTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ITransferPatient) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TransferPatient data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-name-label");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Facility Name");
  });
  it("To check caregiver name header validation", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(transferPatientTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ITransferPatient) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TransferPatient data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("care-giver-name-label");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Caregiver or Physician Now Responsible");
  });
  it("To check phone number header validation", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(transferPatientTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ITransferPatient) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TransferPatient data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("phone-number-label");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Facility Phone Number");
  });
  it("To check Comment header validation", () => {
    const Validator = new SendNoteValidator();
    const data = getDeepClone(transferPatientTestData);
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TransferPatient data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("comment-label");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Comments");
  });
});
