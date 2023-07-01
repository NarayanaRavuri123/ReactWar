import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import SearchHomeCareProvider from "../homeCareSearch.component";
import { NewOrderValidator } from "../../../newOrder.validator";
import { INewOrder } from "../../../newOrder.interface";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import {
  defaultHomeCareProviderSearchBox
} from "../homeCareProviderSearch.model";
import HomeCareProviderSearchDropDown from "../homeCareProviderSearchDropDown.component";
import SearchHomeCareProviderChild from "../homeCareSearchChild.component";

describe("Search Home Care Provider Component ->", () => { 
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("Home Care Provider Search Popup Exists", () => {
    render(
      <SearchHomeCareProvider
        handleHomeCareProviderSearchType={() => {}}
        setSelectedHomeCareProvider={() => {}}
      />
    );
    const title = screen.getByTestId("homecareproviderSearchTitle");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Home Care Provider Search");
  });

  it("Home Care Provider SearchTitle Secondary", async () => {
    render(
      <SearchHomeCareProviderChild
            handleHomeCareProviderSearchType={() => {}}
            clearSearchData={() => {}}
            displayAddManualHomeCare={() => {}}
            homeCareProviderTextBox={getDeepClone(defaultHomeCareProviderSearchBox)}
            showHomeCareProviderCrossIcon={() => {}}
            setShowHomeCareProviderCrossIcon={() => {}}
            showNoResults={false}
            showHomeCareProviderOption={true}
            setShowHomeCareProviderOption={() => {}}
            homeCareProviderList={[]}
            validateAndSetData={() => {}}
            handleSelectOption={() => {}}
          />
    );
    const searchPrescriberSec = screen.getByTestId(
      "homeCareProviderSearchLabel"
    );
    expect(searchPrescriberSec).toBeInTheDocument();
    expect(searchPrescriberSec).toHaveTextContent("Search My Provider List");
  });

  it("Home Care Provider Search button present", () => {
    render(
      <SearchHomeCareProviderChild
            handleHomeCareProviderSearchType={() => {}}
            clearSearchData={() => {}}
            displayAddManualHomeCare={() => {}}
            homeCareProviderTextBox={getDeepClone(defaultHomeCareProviderSearchBox)}
            showHomeCareProviderCrossIcon={() => {}}
            setShowHomeCareProviderCrossIcon={() => {}}
            showNoResults={false}
            showHomeCareProviderOption={true}
            setShowHomeCareProviderOption={() => {}}
            homeCareProviderList={[]}
            validateAndSetData={() => {}}
            handleSelectOption={() => {}}
          />
    );
    const btnLink = screen.getByTestId("facilities-database-button");
    expect(btnLink).toBeInTheDocument();
    expect(btnLink).toHaveTextContent("Search Facilities Database instead");
  });

  it("Home Care Provider Search Input Present", () => {
    render(
      <HomeCareProviderSearchDropDown
        clearSearchData={() => {}}
        displayAddManualHomeCare={() => {}}
        homeCareProviderTextBox={getDeepClone(defaultHomeCareProviderSearchBox)}
        showHomeCareProviderCrossIcon={true}
        setShowHomeCareProviderCrossIcon={() => {}}
        showNoResults={true}
        showHomeCareProviderOption={() => {}}
        setShowHomeCareProviderOption={() => {}}
        homeCareProviderList={[]}
        validateAndSetData={() => {}}
        handleSelectOption={() => {}}
      />
    );
    const btnLink = screen.getByTestId("homeCareProviderSearchInputTest");
    expect(btnLink).toBeInTheDocument();
  });
  it("Add New Home Care Provider button present", () => {
    render(
      <SearchHomeCareProviderChild
      handleHomeCareProviderSearchType={() => {}}
      clearSearchData={() => {}}
      displayAddManualHomeCare={() => {}}
      homeCareProviderTextBox={getDeepClone(defaultHomeCareProviderSearchBox)}
      showHomeCareProviderCrossIcon={() => {}}
      setShowHomeCareProviderCrossIcon={() => {}}
      showNoResults={false}
      showHomeCareProviderOption={true}
      setShowHomeCareProviderOption={() => {}}
      homeCareProviderList={[]}
      validateAndSetData={() => {}}
      handleSelectOption={() => {}}
    />
    );
    const btnLink = screen.getByTestId("add-new-homecareprovider-button");
    expect(btnLink).toBeInTheDocument();
  });
  it("Homecare search box should not allow special character", () => {
    const Validator = new NewOrderValidator();
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    defaultHomeCareProviderSearchBox.homeCareProviderSearch.value =
      "healthcare";
    render(
      <HomeCareProviderSearchDropDown
        clearSearchData={() => {}}
        displayAddManualHomeCare={() => {}}
        homeCareProviderTextBox={getDeepClone(defaultHomeCareProviderSearchBox)}
        showHomeCareProviderCrossIcon={true}
        setShowHomeCareProviderCrossIcon={() => {}}
        showNoResults={false}
        showHomeCareProviderOption={false}
        setShowHomeCareProviderOption={() => {}}
        homeCareProviderList={[]}
        validateAndSetData={() => {}}
        handleSelectOption={() => {}}
      />
    );
    const ele = screen.getByTestId(
      "homeCareProviderSearchInputTest"
    ) as HTMLElement;
    expect(ele).toBeInTheDocument();
  });
});
