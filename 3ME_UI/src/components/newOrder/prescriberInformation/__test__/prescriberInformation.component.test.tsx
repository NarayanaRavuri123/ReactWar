import { cleanup, render, screen } from "@testing-library/react";
import { PrescriberInformation } from "../prescriberInformation.component";

describe("Search Prescriber Component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Prescriber Information Title", () => {
    render(<PrescriberInformation states={[]} statesText={[]} />);
    const title = screen.getByTestId("prescriber-informantion-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Prescriber Information");
  });

  it("Prescriber Information Desc", () => {
    render(<PrescriberInformation states={[]} statesText={[]} />);
    const searchPrescriberSec = screen.getByTestId(
      "prescriber-informantion-desc"
    );
    expect(searchPrescriberSec).toBeInTheDocument();
    expect(searchPrescriberSec).toHaveTextContent(
      "Physicians selected will be added to your Facility List if all physician fields are provided below."
    );
  });

  it("Prescriber Information Btn", () => {
    render(<PrescriberInformation states={[]} statesText={[]} />);
    const searchPrescriberSec = screen.getByTestId(
      "prescriber-informantion-button"
    );
    expect(searchPrescriberSec).toBeInTheDocument();
    expect(searchPrescriberSec).toHaveTextContent("Search for Prescriber");
  });
});
