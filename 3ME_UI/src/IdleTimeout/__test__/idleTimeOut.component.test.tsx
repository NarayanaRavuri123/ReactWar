import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IdleTimerProvider } from "react-idle-timer";
import { IdleTimeoutModal } from "../idleTimeOutModal.component";

describe("IdleTimeoutModel Component->", () => {
  afterEach(() => {
    cleanup();
  });
  it("Component present or not", () => {
    const mockFn = jest.fn();

    render(
      <IdleTimerProvider>
        <IdleTimeoutModal
          showModal={true}
          handleLogout={mockFn}
          setShowModal={mockFn}
        />
      </IdleTimerProvider>
    );
    const component = screen.getByTestId("idleTimeOutPopup");
    expect(component).toBeInTheDocument();
    const header = screen.getByTestId("idleTimeOutPopupTitleTest");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Need more time?");
    const subheader = screen.getByTestId("idleTimeOutPopupsubdesc");
    expect(subheader).toBeInTheDocument();
    expect(subheader).toHaveTextContent("Do you want to stay logged in?");
    const nobutton = screen.getByTestId("idleTimeOutDNoBtn");
    expect(nobutton).toBeInTheDocument();
    expect(nobutton).toHaveTextContent("No, log me out");
    const yesbutton = screen.getByTestId("idleTimeOutDYesBtn");
    expect(yesbutton).toBeInTheDocument();
    expect(yesbutton).toHaveTextContent("Yes, keep me logged in");
  });
  it("  On click of Yes keep me logged in button function  ", () => {
    const mocknobtnFn = jest.fn();
    const mockyesbtnFn = jest.fn();
    const mockstartbtnFn = jest.fn();
    render(
      <IdleTimerProvider>
        <IdleTimeoutModal
          showModal={true}
          handleLogout={mocknobtnFn}
          setShowModal={mockstartbtnFn}
        />
      </IdleTimerProvider>
    );
    const yesbutton = screen.getByTestId("idleTimeOutTest") as HTMLElement;
    expect(yesbutton).toBeInTheDocument();
  });
  it(" On click of No, log me out button function ", () => {
    const mocknobtnFn = jest.fn();
    const mockyesbtnFn = jest.fn();
    const mockstartbtnFn = jest.fn();
    render(
      <IdleTimerProvider>
        <IdleTimeoutModal
          showModal={true}
          handleLogout={mocknobtnFn}
          setShowModal={mockstartbtnFn}
        />
      </IdleTimerProvider>
    );
    const nobutton = screen.getByTestId("donNotDeleteTest") as HTMLElement;
    expect(nobutton).toBeInTheDocument();
    userEvent.click(nobutton);
    expect(mocknobtnFn).toBeCalledTimes(1);
  });
});
