import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { SearchInput } from "../searchInput.component";
import { ReactComponent as SearchIcon } from "../../../assets/magnifier.svg";

describe("Search input component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Popup is rendered", () => {
    render(
      <SearchInput
        handleDeselect={() => {}}
        handleSearchClick={() => {}}
        handleSelect={() => {}}
        optionData={[]}
        selectedBoxLabel="Test label"
        selectedData={[]}
        showNoResults={false}
        handleNoResultClick={() => {}}
        searchInputProps={{
          classes: {
            root: "so-outlined-input-root",
            input: "so-outlined-input",
          },
          startAdornment: <SearchIcon />,
          placeholder: "Search for user by name or email",
          value: "",
          onChange: (e) => {},
        }}
      />
    );
    const inputComp = screen.getByTestId("search-input-box");
    expect(inputComp).toBeInTheDocument();
  });
  it("conatins search button", () => {
    render(
      <SearchInput
        handleDeselect={() => {}}
        handleSearchClick={() => {}}
        handleSelect={() => {}}
        optionData={[]}
        selectedBoxLabel="Test label"
        selectedData={[]}
        showNoResults={false}
        handleNoResultClick={() => {}}
        searchInputProps={{
          classes: {
            root: "so-outlined-input-root",
            input: "so-outlined-input",
          },
          startAdornment: <SearchIcon />,
          placeholder: "Search for user by name or email",
          value: "",
          onChange: (e) => {},
        }}
      />
    );
    const searchBtn = screen.getByTestId("search-button");
    expect(searchBtn).toBeInTheDocument();
  });
  it("shows select options on search", () => {
    render(
      <SearchInput
        handleDeselect={() => {}}
        handleSearchClick={() => {}}
        handleSelect={() => {}}
        optionData={[
          {
            key: "Test user",
            value: "test@gmail.com",
          },
        ]}
        selectedBoxLabel="Test label"
        selectedData={[]}
        showNoResults={false}
        handleNoResultClick={() => {}}
        searchInputProps={{
          classes: {
            root: "so-outlined-input-root",
            input: "so-outlined-input",
          },
          startAdornment: <SearchIcon />,
          placeholder: "Search for user by name or email",
          value: "test",
          onChange: (e) => {},
        }}
      />
    );
    const userName = screen.getByTestId("Test user");
    expect(userName).toBeInTheDocument();
    const userMail = screen.getByTestId("test@gmail.com");
    expect(userMail).toBeInTheDocument();
  });
  it("show no results option", () => {
    render(
      <SearchInput
        handleDeselect={() => {}}
        handleSearchClick={() => {}}
        handleSelect={() => {}}
        optionData={[
          {
            key: "test@gmail.com",
            value: "",
          },
        ]}
        selectedBoxLabel="Test label"
        selectedData={[]}
        showNoResults={true}
        handleNoResultClick={() => {}}
        searchInputProps={{
          classes: {
            root: "so-outlined-input-root",
            input: "so-outlined-input",
          },
          startAdornment: <SearchIcon />,
          placeholder: "Search for user by name or email",
          value: "xyz",
          onChange: (e) => {},
        }}
      />
    );
    const noRes = screen.getByTestId("no-results");
    expect(noRes).toBeInTheDocument();
  });
});
