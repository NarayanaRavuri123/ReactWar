import { cleanup, render, screen } from "@testing-library/react";
import NationalRegistryNoResult from "../nationalRegistryNoResult/nationalRegistryNoResult.component";
import { NationalRegistrySearch } from "../nationalRegistrySearch.component";
import NationalRegistrySearchByDetails from "../nationalRegistrySearchByDetails/nationalRegistrySearchByDetails.component";
import { defaultNationalRegistrySearchByDetails } from "../nationRegistrySearch.model";

describe("National Registry Search ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Prescriber Search NPI Title", () => {
    render(
      <NationalRegistrySearch
        handlePrescriberSearchType={() => {}}
        states={[]}
        statesText={[]}
        handleNpiPrescriberSearchResult={() => {}}
      />
    );
    const title = screen.getByTestId("nrprescriberSearchTitleSec");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Search in National Registry");
  });

  it("Prescriber switch link", () => {
    render(
      <NationalRegistrySearch
        handlePrescriberSearchType={() => {}}
        states={[]}
        statesText={[]}
        handleNpiPrescriberSearchResult={() => {}}
      />
    );
    const linkButton = screen.getByTestId(
      "nrprescriber-informantion-addOrRemove-button"
    );
    expect(linkButton).toBeInTheDocument();
    expect(linkButton).toHaveTextContent("Search My Prescriber List instead");
  });

  it("Prescriber NPI Button validate", () => {
    render(
      <NationalRegistrySearch
        handlePrescriberSearchType={() => {}}
        states={[]}
        statesText={[]}
        handleNpiPrescriberSearchResult={() => {}}
      />
    );
    const buttonText = screen.getByTestId("searchnpibutton");
    expect(buttonText).toBeInTheDocument();
    expect(buttonText).toHaveTextContent("Search");
  });

  it("Prescriber NPI no result validate", () => {
    render(<NationalRegistryNoResult handlePrescriberSearchType={() => {}} />);
    const buttonText = screen.getByTestId("noresult");
    expect(buttonText).toBeInTheDocument();
    expect(buttonText).toHaveTextContent("No results");
  });

  it("Prescriber NPI no result back button for Search Again", () => {
    render(<NationalRegistryNoResult handlePrescriberSearchType={() => {}} />);
    const buttonText = screen.getByTestId("noresultBackButton");
    expect(buttonText).toBeInTheDocument();
    expect(buttonText).toHaveTextContent("Search Again");
  });

  it("Prescriber NPI Search validate State dropdown", () => {
    let defaultData = defaultNationalRegistrySearchByDetails;
    render(
      <NationalRegistrySearchByDetails
        nationRegistrySearchByDetails={defaultData}
        handleSearchNPI={() => {}}
        setNationRegistrySearchByDetails={() => {}}
        setNationalRegistrySearchInputs={() => {}}
        states={[]}
        statesText={[]}
      />
    );
    const labelText = screen.getByTestId("stateTestID");
    expect(labelText).toBeInTheDocument();
    expect(labelText).toHaveTextContent("State");
  });
  it("Prescriber NPI Search validate Last Name input field", () => {
    let defaultData = defaultNationalRegistrySearchByDetails;
    render(
      <NationalRegistrySearchByDetails
        nationRegistrySearchByDetails={defaultData}
        handleSearchNPI={() => {}}
        setNationRegistrySearchByDetails={() => {}}
        setNationalRegistrySearchInputs={() => {}}
        states={[]}
        statesText={[]}
      />
    );
    const labelText = screen.getByTestId("NPILastName");
    expect(labelText).toBeInTheDocument();
    expect(labelText).toHaveTextContent("Physician Last Name");
  });
  it("Prescriber NPI Search validate First Name input field", () => {
    let defaultData = defaultNationalRegistrySearchByDetails;
    render(
      <NationalRegistrySearchByDetails
        nationRegistrySearchByDetails={defaultData}
        handleSearchNPI={() => {}}
        setNationRegistrySearchByDetails={() => {}}
        setNationalRegistrySearchInputs={() => {}}
        states={[]}
        statesText={[]}
      />
    );
    const labelText = screen.getByTestId("NPIFirstName");
    expect(labelText).toBeInTheDocument();
    expect(labelText).toHaveTextContent("Physician First Name");
  });
});
