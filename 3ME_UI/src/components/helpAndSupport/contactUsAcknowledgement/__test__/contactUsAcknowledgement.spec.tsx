import { cleanup, render, screen } from "@testing-library/react";
import { ContactUsAcknowledgement } from "../contactUsAcknowledgement.component";

describe("Contact Us component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("initial render shows Contact us Label", () => {
    render(<ContactUsAcknowledgement />);
    const val = document.querySelector("h2");
    expect(val?.textContent).toBe("Contact Us");
  });
  it("Contact us acknowledgement contains a redirect button", () => {
    render(<ContactUsAcknowledgement />);
    const btn = document.querySelector(".returnBtn");
    expect(btn).toBeDefined();
  });
  it("Contact us acknowledgement contains urgent section", () => {
    render(<ContactUsAcknowledgement />);
    const contactSec = screen.getByTestId("contactDes");
    expect(contactSec).toBeInTheDocument();
  });
  it("page should be scrolled to top on load of Contact us acknowledgement", () => {
    const spyFn = jest.fn();
    let windowService = {
      scrollToTop: spyFn,
    };
    // @ts-ignore
    render(<ContactUsAcknowledgement windowService={windowService} />);
    expect(spyFn).toHaveBeenCalled();
  });
});
