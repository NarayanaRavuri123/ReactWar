import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import SearchPrescriber from "../prescriberSearch.component";
import { defaultPrescriberSearchBox } from "../prescriberSearch.model";
import SearchPrescriberChild from "../prescriberSearchChild.component";
import PrescriberSearchDropDown from "../prescriberSearchDropDown.component";

describe("Search Prescriber Component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Prescriber Search Popup Exists", () => {
    render(<SearchPrescriber handlePrescriberSearchType={() => {}} />);
    const title = screen.getByTestId("prescriberSearchTitle");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Prescriber Search");
  });

  it("Prescriber Search Title Secondary", () => {
    const showSpinner: boolean = false;
    React.useState = jest.fn().mockReturnValue([showSpinner, false]);
    render(
      <SearchPrescriberChild
        validateAndSetData={() => {}}
        handleselectOption={() => {}}
        showPrescriberOption={() => {}}
        showNoResults={false}
        prescriberList={[]}
        prescriberTextBox={getDeepClone(defaultPrescriberSearchBox)}
        setshowPrescriberOption={() => {}}
        handlePrescriberSearchType={() => {}}
      />
    );
    const searchPrescriberSec = screen.getByTestId("prescriberSearchTitleSec");
    expect(searchPrescriberSec).toBeInTheDocument();
    expect(searchPrescriberSec).toHaveTextContent("Search My Prescriber List");
  });

  it("Prescriber search button present", () => {
    const showSpinner: boolean = false;
    React.useState = jest.fn().mockReturnValue([showSpinner, false]);
    render(
      <SearchPrescriberChild
        validateAndSetData={() => {}}
        handleselectOption={() => {}}
        showPrescriberOption={() => {}}
        showNoResults={false}
        prescriberList={[]}
        prescriberTextBox={getDeepClone(defaultPrescriberSearchBox)}
        setshowPrescriberOption={() => {}}
        handlePrescriberSearchType={() => {}}
      />
    );
    const btnLink = screen.getByTestId(
      "prescriber-informantion-addOrRemove-button"
    );
    expect(btnLink).toBeInTheDocument();
  });
  it("Prescriber Search Input Present", () => {
    render(
      <PrescriberSearchDropDown
        validateAndSetData={() => {}}
        handleselectOption={() => {}}
        showPrescriberOption={() => {}}
        showNoResults={true}
        prescriberList={[]}
        prescriberTextBox={getDeepClone(defaultPrescriberSearchBox)}
        setShowPrescriberOption={() => {}}
        handlePrescriberSearchType={() => {}}
      />
    );
    const btnLink = screen.getByTestId("prescriberSearchInputTest");
    expect(btnLink).toBeInTheDocument();
  });
});
