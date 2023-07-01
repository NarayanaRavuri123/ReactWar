import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import { ShareOrderInvite } from "../shareOrderInvite/shareOrderInvite.component";
import { defaultShareOrderInivte } from "../shareOrderInvite/shareOrderInvite.interface";

describe("Share Order Invite component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("renders share invite popup", () => {
    const mockFn = jest.fn();
    render(
      <ShareOrderInvite
        handleShareOrderType={mockFn}
        setShareOrderSuccessInvite={() => {}}
        addshareOrderInvite={defaultShareOrderInivte}
        setAddShareOrderInvite={() => {}}
      />
    );
    const popup = screen.getByTestId("shareOrderInviteMainTest");
    expect(popup).toBeInTheDocument();
  });
  it("renders share invite header", () => {
    const mockFn = jest.fn();
    render(
      <ShareOrderInvite
        handleShareOrderType={mockFn}
        setShareOrderSuccessInvite={() => {}}
        addshareOrderInvite={defaultShareOrderInivte}
        setAddShareOrderInvite={() => {}}
      />
    );
    const popup = screen.getByTestId("shareOrderInviteHeaderTest");
    expect(popup).toBeInTheDocument();
  });
  it("renders share invite first name", () => {
    const mockFn = jest.fn();
    render(
      <ShareOrderInvite
        handleShareOrderType={mockFn}
        setShareOrderSuccessInvite={() => {}}
        addshareOrderInvite={defaultShareOrderInivte}
        setAddShareOrderInvite={() => {}}
      />
    );
    const popup = screen.getByTestId("shareOrderInviteFirstNameTest");
    expect(popup).toBeInTheDocument();
  });
  it("renders share invite last name", () => {
    const mockFn = jest.fn();
    render(
      <ShareOrderInvite
        handleShareOrderType={mockFn}
        setShareOrderSuccessInvite={() => {}}
        addshareOrderInvite={defaultShareOrderInivte}
        setAddShareOrderInvite={() => {}}
      />
    );
    const popup = screen.getByTestId("shareOrderInviteLastNameTest");
    expect(popup).toBeInTheDocument();
  });
  it("renders share invite email", () => {
    const mockFn = jest.fn();
    render(
      <ShareOrderInvite
        handleShareOrderType={mockFn}
        setShareOrderSuccessInvite={() => {}}
        addshareOrderInvite={defaultShareOrderInivte}
        setAddShareOrderInvite={() => {}}
      />
    );
    const popup = screen.getByTestId("shareOrderInviteEmailTest");
    expect(popup).toBeInTheDocument();
  });
  it("renders share invite textarea", () => {
    const mockFn = jest.fn();
    render(
      <ShareOrderInvite
        handleShareOrderType={mockFn}
        setShareOrderSuccessInvite={() => {}}
        addshareOrderInvite={defaultShareOrderInivte}
        setAddShareOrderInvite={() => {}}
      />
    );
    const popup = screen.getByTestId("shareOrderInviteTextTest");
    expect(popup).toBeInTheDocument();
  });
  it("remaining character shareorder invite rendered", () => {
    const mockFn = jest.fn();
    render(
      <ShareOrderInvite
        handleShareOrderType={mockFn}
        setShareOrderSuccessInvite={() => {}}
        addshareOrderInvite={defaultShareOrderInivte}
        setAddShareOrderInvite={() => {}}
      />
    );
    const doneBtn = screen.getByTestId("remaining-chars-shareorderinvite");
    expect(doneBtn).toBeInTheDocument();
  });
  it("cancel button for share order invite", () => {
    const mockFn = jest.fn();
    render(
      <ShareOrderInvite
        handleShareOrderType={mockFn}
        setShareOrderSuccessInvite={() => {}}
        addshareOrderInvite={defaultShareOrderInivte}
        setAddShareOrderInvite={() => {}}
      />
    );
    const doneBtn = screen.getByTestId("shareOrderInviteCancelTest");
    expect(doneBtn).toBeInTheDocument();
  });
  it("send invite button for share order invite", () => {
    const mockFn = jest.fn();
    render(
      <ShareOrderInvite
        handleShareOrderType={mockFn}
        setShareOrderSuccessInvite={() => {}}
        addshareOrderInvite={defaultShareOrderInivte}
        setAddShareOrderInvite={() => {}}
      />
    );
    const doneBtn = screen.getByTestId("shareOrderInviteSendTest");
    expect(doneBtn).toBeInTheDocument();
  });
});
