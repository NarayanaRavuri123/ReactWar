import { cleanup, render, screen } from "@testing-library/react";
import { PrescriberFound } from "../prescriberFound.component";

describe("Prescriber found Component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Prescriber Found Title", () => {
    render(<PrescriberFound handlePrescriberSearchType={() => {}} />);
    const title = screen.getByTestId("prescriber-found-header");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("My Prescriber Search Result");
  });

  it("Prescriber Name Test", () => {
    render(<PrescriberFound handlePrescriberSearchType={() => {}} />);
    const presFndName = screen.getByTestId("prescriber-name");
    expect(presFndName).toBeInTheDocument();
  });
  it("prescriber npi Test", () => {
    render(<PrescriberFound handlePrescriberSearchType={() => {}} />);
    const presFndName = screen.getByTestId("prescriber-npi");
    expect(presFndName).toBeInTheDocument();
  });
  it("prescriber phone Test", () => {
    render(<PrescriberFound handlePrescriberSearchType={() => {}} />);
    const presFndName = screen.getByTestId("prescriber-phone");
    expect(presFndName).toBeInTheDocument();
  });

  it("prescriber fax Test", () => {
    render(<PrescriberFound handlePrescriberSearchType={() => {}} />);
    const presFndName = screen.getByTestId("prescriber-fax");
    expect(presFndName).toBeInTheDocument();
  });

  it("Prescriber found back to search Btn", () => {
    render(<PrescriberFound handlePrescriberSearchType={() => {}} />);
    const searchPrescriberSec = screen.getByTestId("back-to-search-prescriber");
    expect(searchPrescriberSec).toBeInTheDocument();
    expect(searchPrescriberSec).toHaveTextContent("Back to Search");
  });
});
