import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import { defaultShareOrderInivte } from "../shareOrderInvite/shareOrderInvite.interface";
import { ShareSuccess } from "../shareSuccess.component";

describe("Share success component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("renders share success popup", () => {
    render(
      <ShareSuccess
        isShareOrderInvite={false}
        addshareOrderInvite={defaultShareOrderInivte}
        closePopupHandler={() => {}}
      />
    );
    const popup = screen.getByTestId("share-success-popup-box");
    expect(popup).toBeInTheDocument();
  });
  it("Done button is rendered", () => {
    render(
      <ShareSuccess
        isShareOrderInvite={false}
        addshareOrderInvite={defaultShareOrderInivte}
        closePopupHandler={() => {}}
      />
    );
    const doneBtn = screen.getByTestId("success-done-btn");
    expect(doneBtn).toBeInTheDocument();
  });
  it("Success popup for share order invite", () => {
    render(
      <ShareSuccess
        isShareOrderInvite={true}
        addshareOrderInvite={defaultShareOrderInivte}
        closePopupHandler={() => {}}
      />
    );
    const doneBtn = screen.getByTestId("shareorderemailTest");
    expect(doneBtn).toBeInTheDocument();
  });
  it("Success popup for share order invite with facility", () => {
    render(
      <ShareSuccess
        isShareOrderInvite={true}
        addshareOrderInvite={defaultShareOrderInivte}
        closePopupHandler={() => {}}
      />
    );
    const doneBtn = screen.getByTestId("shareorderFacilityTest");
    expect(doneBtn).toBeInTheDocument();
  });
});
