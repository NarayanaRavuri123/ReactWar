import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MissingRxFaxSent from "../missingRxFaxSent.component.component";

describe("Missing Rx Fax in later sent component->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate description", () => {
    render(<MissingRxFaxSent closePopUpAction={() => {}} pdfLink={""} />);
    const description = screen.getByTestId("description-missingRxFaxSent");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "Success! The prescription type has been changed to fax."
    );
  });

  it("Validate sub-description", () => {
    render(<MissingRxFaxSent closePopUpAction={() => {}} pdfLink={""} />);
    const subDescription = screen.getByTestId(
      "sub-description-missingRxFaxSent"
    );
    expect(subDescription).toBeInTheDocument();
    expect(subDescription).toHaveTextContent(
      "A prescription signed and dated by the prescriber is required for all orders"
    );
  });

  it("Validate print rx button", () => {
    const openPdf = jest.fn();
    render(
      <MissingRxFaxSent
        closePopUpAction={() => {}}
        openPdf={openPdf}
        pdfLink={""}
      />
    );
    const printRx = screen.getByTestId("print-rx-button");
    expect(printRx).toBeInTheDocument();
    expect(printRx).toHaveTextContent("Print Rx");
    userEvent.click(printRx);
    expect(openPdf).toBeCalledTimes(1);
  });

  it("Validate fax details", () => {
    render(<MissingRxFaxSent closePopUpAction={() => {}} pdfLink={""} />);
    const faxDetail = screen.getByTestId("fax-detail-text");
    expect(faxDetail).toBeInTheDocument();
    expect(faxDetail).toHaveTextContent(
      "Please fax the prescription to 1-888-245-2295."
    );
  });
  it("Validate done button", () => {
    const closePopUp = jest.fn();
    render(<MissingRxFaxSent closePopUpAction={closePopUp} pdfLink={""} />);
    const done = screen.getByTestId("done-button");
    expect(done).toBeInTheDocument();
    expect(done).toHaveTextContent("Done");
    userEvent.click(done);
    expect(closePopUp).toBeCalledTimes(1);
  });
});
