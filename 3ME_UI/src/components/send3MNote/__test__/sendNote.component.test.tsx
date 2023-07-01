import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { MyPatientContext } from "../../../context/MyPatientContext";
import { SendNoteContext } from "../../../context/SendNoteContext";
import { patientMockData } from "../../../mockData/patientFound";
import { getDeepClone } from "../../../util/ObjectFunctions";
import { SendNote } from "../sendNote.component";
import { mockSendNoteData } from "./sendNote.test.data";
import { getMockSendNoteData } from "./sendNoteMockContext.data";
jest.mock("../../../core/popup/popup.component");

describe("Send 3M a Note component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Send 3M a Note validate header", () => {
    const loading = false;
    React.useState = jest.fn().mockReturnValue([loading, {}]);
    const error = false;
    React.useState = jest.fn().mockReturnValue([error, {}]);
    const data = getDeepClone(mockSendNoteData);
    React.useState = jest.fn().mockReturnValue([data, {}]);
    render(
      <SendNoteContext.Provider
        value={{
          ...getMockSendNoteData(),
        }}
      >
        <MemoryRouter>
          <SendNote />
        </MemoryRouter>
      </SendNoteContext.Provider>
    );
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Send 3M a Note");
    const description = screen.getByTestId("description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "Please select your contact reason and enter information and comments below. You will receive an email confirmation that your comments have been sent. Requests and comments are processed Monday through Friday (except for Holidays) from 7 a.m. to 7 p.m. If this is an urgent matter, please contact the National Contact Center at 1-800-275-4524."
    );
  });

  it("Send 3M a Note validate patient details", () => {
    const loading = false;
    React.useState = jest.fn().mockReturnValue([loading, {}]);
    const error = false;
    React.useState = jest.fn().mockReturnValue([error, {}]);
    const data = getDeepClone(mockSendNoteData);
    React.useState = jest.fn().mockReturnValue([data, {}]);
    const patient = getDeepClone(patientMockData);
    React.useState = jest.fn().mockReturnValue([patient, {}]);
    render(
      <SendNoteContext.Provider
        value={{
          ...getMockSendNoteData(),
        }}
      >
        <MemoryRouter>
          <SendNote testData={data} />
        </MemoryRouter>
      </SendNoteContext.Provider>
    );
    const patientDetails = screen.getByTestId("patient-details-component");
    expect(patientDetails).toBeInTheDocument();
  });

  it("Send 3M a Note validate contact reason dropdown", () => {
    const loading = false;
    React.useState = jest.fn().mockReturnValue([loading, {}]);
    const error = false;
    React.useState = jest.fn().mockReturnValue([error, {}]);
    const data = getDeepClone(mockSendNoteData);
    React.useState = jest.fn().mockReturnValue([data, {}]);
    render(
      <SendNoteContext.Provider
        value={{
          ...getMockSendNoteData(),
        }}
      >
        <MemoryRouter>
          <SendNote />
        </MemoryRouter>
      </SendNoteContext.Provider>
    );
    const contactReasonDiv = screen.getByTestId("send-note-contact-reason-div");
    expect(contactReasonDiv).toBeInTheDocument();
    const title = screen.getByTestId("send-note-contact-reason");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Contact Reason");
    const dropdown = screen.getByTestId("contactResason-dropdown");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveTextContent("Select Reason");
  });

  it("Send 3M a Note validate change address", () => {
    const loading = false;
    React.useState = jest.fn().mockReturnValue([loading, {}]);
    const error = false;
    React.useState = jest.fn().mockReturnValue([error, {}]);
    const data = getDeepClone(mockSendNoteData);
    data.contactResason.value = "1";
    React.useState = jest.fn().mockReturnValue([data, {}]);
    render(
      <SendNoteContext.Provider
        value={{
          ...getMockSendNoteData(1),
        }}
      >
        <MemoryRouter>
          <SendNote testData={data} />
        </MemoryRouter>
      </SendNoteContext.Provider>
    );
    const changeAddress = screen.getByTestId("change-address-component");
    expect(changeAddress).toBeInTheDocument();
  });

  it("Send 3M a Note validate transfer patient", () => {
    const loading = false;
    React.useState = jest.fn().mockReturnValue([loading, {}]);
    const error = false;
    React.useState = jest.fn().mockReturnValue([error, {}]);
    const data = getDeepClone(mockSendNoteData);
    data.contactResason.value = "2";
    React.useState = jest.fn().mockReturnValue([data, {}]);
    render(
      <SendNoteContext.Provider
        value={{
          ...getMockSendNoteData(2),
        }}
      >
        <MemoryRouter>
          <SendNote testData={data} />
        </MemoryRouter>
      </SendNoteContext.Provider>
    );
    const changeAddress = screen.getByTestId("transfer-patient-div");
    expect(changeAddress).toBeInTheDocument();
  });

  it("Send 3M a Note validate ask question", () => {
    const loading = false;
    React.useState = jest.fn().mockReturnValue([loading, {}]);
    const error = false;
    React.useState = jest.fn().mockReturnValue([error, {}]);
    const data = getDeepClone(mockSendNoteData);
    data.contactResason.value = "3";
    React.useState = jest.fn().mockReturnValue([data, {}]);
    render(
      <SendNoteContext.Provider
        value={{
          ...getMockSendNoteData(3),
        }}
      >
        <MemoryRouter>
          <SendNote testData={data} />
        </MemoryRouter>
      </SendNoteContext.Provider>
    );
    const changeAddress = screen.getByTestId("ask-question-div");
    expect(changeAddress).toBeInTheDocument();
  });
});
