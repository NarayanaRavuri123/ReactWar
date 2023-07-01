import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import { ShareOrder } from "../shareOrder.component";

describe("Share order component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("conatins sign up label", () => {
    const mockFn = jest.fn();
    render(
      <ShareOrder
        setShareOrderOpen={mockFn}
        handleShareOrderType={mockFn}
        searchInputVal={""}
        setSearchInputVal={() => {}}
        showNoResults={false}
        setShowNoResults={() => {}}
        shareOrderOptions={[]}
        setShareOrderOptions={() => {}}
        selectedUsers={[]}
        setSelectedUsers={() => {}}
        noteForUsers={""}
        setNoteForUsers={() => {}}
        noteError={false}
        setNoteError={() => {}}
        handleSaveAndShare={() => {}}
      />
    );
    const popUp = screen.getByTestId("shareOrderPopupTest");
    expect(popUp).toBeInTheDocument();
  });
  it("conatins notify text", () => {
    const mockFn = jest.fn();
    render(
      <ShareOrder
        setShareOrderOpen={mockFn}
        handleShareOrderType={mockFn}
        searchInputVal={""}
        setSearchInputVal={() => {}}
        showNoResults={false}
        setShowNoResults={() => {}}
        shareOrderOptions={[]}
        setShareOrderOptions={() => {}}
        selectedUsers={[]}
        setSelectedUsers={() => {}}
        noteForUsers={""}
        setNoteForUsers={() => {}}
        noteError={false}
        setNoteError={() => {}}
        handleSaveAndShare={() => {}}
      />
    );
    const compo = screen.getByTestId("notify-3m");
    expect(compo).toBeInTheDocument();
  });
  it("conatins test area", () => {
    const mockFn = jest.fn();
    render(
      <ShareOrder
        setShareOrderOpen={mockFn}
        handleShareOrderType={mockFn}
        searchInputVal={""}
        setSearchInputVal={() => {}}
        showNoResults={false}
        setShowNoResults={() => {}}
        shareOrderOptions={[]}
        setShareOrderOptions={() => {}}
        selectedUsers={[]}
        setSelectedUsers={() => {}}
        noteForUsers={""}
        setNoteForUsers={() => {}}
        noteError={false}
        setNoteError={() => {}}
        handleSaveAndShare={() => {}}
      />
    );
    const compo = screen.getByTestId("note-textarea");
    expect(compo).toBeInTheDocument();
  });
  it("conatins remaining character text", () => {
    const mockFn = jest.fn();
    render(
      <ShareOrder
        setShareOrderOpen={mockFn}
        handleShareOrderType={mockFn}
        searchInputVal={""}
        setSearchInputVal={() => {}}
        showNoResults={false}
        setShowNoResults={() => {}}
        shareOrderOptions={[]}
        setShareOrderOptions={() => {}}
        selectedUsers={[]}
        setSelectedUsers={() => {}}
        noteForUsers={""}
        setNoteForUsers={() => {}}
        noteError={false}
        setNoteError={() => {}}
        handleSaveAndShare={() => {}}
      />
    );
    const compo = screen.getByTestId("remaining-chars");
    expect(compo).toBeInTheDocument();
  });
  it("conatins cancel button", () => {
    const mockFn = jest.fn();
    render(
      <ShareOrder
        setShareOrderOpen={mockFn}
        handleShareOrderType={mockFn}
        searchInputVal={""}
        setSearchInputVal={() => {}}
        showNoResults={false}
        setShowNoResults={() => {}}
        shareOrderOptions={[]}
        setShareOrderOptions={() => {}}
        selectedUsers={[]}
        setSelectedUsers={() => {}}
        noteForUsers={""}
        setNoteForUsers={() => {}}
        noteError={false}
        setNoteError={() => {}}
        handleSaveAndShare={() => {}}
      />
    );
    const compo = screen.getByTestId("share-cancel-btn");
    expect(compo).toBeInTheDocument();
  });
  it("conatins share order button", () => {
    const mockFn = jest.fn();
    render(
      <ShareOrder
        setShareOrderOpen={mockFn}
        handleShareOrderType={mockFn}
        searchInputVal={""}
        setSearchInputVal={() => {}}
        showNoResults={false}
        setShowNoResults={() => {}}
        shareOrderOptions={[]}
        setShareOrderOptions={() => {}}
        selectedUsers={[]}
        setSelectedUsers={() => {}}
        noteForUsers={""}
        setNoteForUsers={() => {}}
        noteError={false}
        setNoteError={() => {}}
        handleSaveAndShare={() => {}}
      />
    );
    const compo = screen.getByTestId("share-order-btn");
    expect(compo).toBeInTheDocument();
  });
  it("share order button is disabled", () => {
    const mockFn = jest.fn();
    render(
      <ShareOrder
        setShareOrderOpen={mockFn}
        handleShareOrderType={mockFn}
        searchInputVal={""}
        setSearchInputVal={() => {}}
        showNoResults={false}
        setShowNoResults={() => {}}
        shareOrderOptions={[]}
        setShareOrderOptions={() => {}}
        selectedUsers={[]}
        setSelectedUsers={() => {}}
        noteForUsers={""}
        setNoteForUsers={() => {}}
        noteError={false}
        setNoteError={() => {}}
        handleSaveAndShare={() => {}}
      />
    );
    const compo = screen.getByTestId("share-order-btn");
    expect(compo).toHaveAttribute("disabled");
  });
});
