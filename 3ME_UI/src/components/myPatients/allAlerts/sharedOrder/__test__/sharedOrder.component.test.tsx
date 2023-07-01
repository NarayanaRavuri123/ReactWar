import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { patientMockData } from "../../../../../mockData/patientFound";
import { IPatient, IPatientAlert } from "../../../patient.interface";
import SharedOrder from "../sharedOrder.component";
import { SharedOrderStop } from "../sharedOrderStop.component";

describe("shared Order component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Stop Share order Header is there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SharedOrderStop
          cancelShareError={false}
          sharingStopped={true}
          closePopUpAction={() => {}}
          sharedByLoggedInUser={false}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("stopper-header").textContent;
    expect(header).toBe("Success! This order is no longer shared");
  });

  it("Stop Share order describtion is there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SharedOrderStop
          cancelShareError={false}
          sharingStopped={true}
          closePopUpAction={() => {}}
          sharedByLoggedInUser={false}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("stopper-desp").textContent;
    expect(header).toBe(
      `Any edits you have made and saved will remain in the order. You can also re-add the order to your list using the Add Patient option from the My Patients dashboard.`
    );
  });

  it("Shared order describtion is there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SharedOrder
          alertData={{} as IPatientAlert}
          patientData={{} as IPatient}
          closePopUpAction={() => {}}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("shared-order-header-title").textContent;
    expect(header).toBe(`Shared Order`);
  });

  it("Shared order notes is there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SharedOrder
          alertData={{} as IPatientAlert}
          patientData={{} as IPatient}
          closePopUpAction={() => {}}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("your-note").textContent;
    expect(header).toBe(`Your note`);
  });

  it("Stop sharing button in UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SharedOrder
          alertData={{} as IPatientAlert}
          patientData={{} as IPatient}
          closePopUpAction={() => {}}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("stop-sharing").textContent;
    expect(header).toBe(`Cancel Sharing`);
  });

  it("edit shared vac order button in UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SharedOrder
          alertData={{} as IPatientAlert}
          patientData={{} as IPatient}
          closePopUpAction={() => {}}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("edit-order").textContent;
    expect(header).toBe(`Edit Order`);
  });
  it("edit shared vac order button action test", () => {
    const alertMockData = patientMockData.alerts[0];
    const patientData = patientMockData;
    const mockClosePopupAction = jest.fn();
    render(
      <SharedOrder
        alertData={alertMockData}
        patientData={patientData}
        closePopUpAction={mockClosePopupAction}
      />
    );
    const editbtn = screen.getByTestId("edit-order");
    expect(editbtn).toBeInTheDocument();
    expect(editbtn).toHaveTextContent(`Edit Order`);
    userEvent.click(editbtn);
    expect(mockClosePopupAction).toBeCalledTimes(1);
  });
});
