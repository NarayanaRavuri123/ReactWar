import { MemoryRouter } from "react-router-dom";
import { Preference } from "../preference.component";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Preference Component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Validate title for preference", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Preference
          title="Title"
          name="name"
          value="no"
          setPreferencesData={spyFn}
        />
      </MemoryRouter>
    );

    const titleElement = screen.getByTestId("preference-title-name");

    // verify preference title and radio button rendered or not
    expect(titleElement).toBeInTheDocument();

    // verify title content
    expect(titleElement).toHaveTextContent("Title");
  });

  it("Validate radio buttons for preference when no selected", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Preference
          title="Title"
          name="name"
          value="no"
          setPreferencesData={jest.fn()}
        />
      </MemoryRouter>
    );

    const yesRadioButton = screen.getByTestId(
      "preference-yes-for-name"
    ) as HTMLInputElement;
    const noRadioButton = screen.getByTestId(
      "preference-no-for-name"
    ) as HTMLInputElement;

    // verify preference radio button rendered or not
    expect(yesRadioButton).toBeInTheDocument();
    expect(noRadioButton).toBeInTheDocument();

    // verify radio buttons state
    expect(yesRadioButton).not.toBeChecked();
    expect(noRadioButton).toBeChecked();

    // select yes and verify radio buttons state
    fireEvent.click(yesRadioButton, { target: { checked: true } });
    expect(yesRadioButton).toBeChecked();
    expect(noRadioButton).not.toBeChecked();

    // select no and verify radio buttons state
    fireEvent.click(noRadioButton, { target: { checked: true } });
    expect(noRadioButton).toBeChecked();
    expect(yesRadioButton).not.toBeChecked();
  });

  it("Validate radio buttons for preference when yes selected", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Preference
          title="Title"
          name="name"
          value="yes"
          setPreferencesData={jest.fn()}
        />
      </MemoryRouter>
    );

    const yesRadioButton = screen.getByTestId(
      "preference-yes-for-name"
    ) as HTMLInputElement;
    const noRadioButton = screen.getByTestId(
      "preference-no-for-name"
    ) as HTMLInputElement;

    // verify preference radio button rendered or not
    expect(yesRadioButton).toBeInTheDocument();
    expect(noRadioButton).toBeInTheDocument();

    // verify radio buttons state
    expect(yesRadioButton).toBeChecked();
    expect(noRadioButton).not.toBeChecked();

    // select no and verify radio buttons state
    fireEvent.click(noRadioButton, { target: { checked: true } });
    expect(noRadioButton).toBeChecked();
    expect(yesRadioButton).not.toBeChecked();

    // select yes and verify radio buttons state
    fireEvent.click(yesRadioButton, { target: { checked: true } });
    expect(yesRadioButton).toBeChecked();
    expect(noRadioButton).not.toBeChecked();
  });

  it("Validate setPreferencesData function getting called or not", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Preference
          title="Title"
          name="name"
          value="no"
          setPreferencesData={spyFn}
        />
      </MemoryRouter>
    );

    const yesRadioButton = screen.getByTestId(
      "preference-yes-for-name"
    ) as HTMLInputElement;

    // when jsut rendered
    expect(spyFn).not.toBeCalled();

    // when user clicks on yes radio button
    userEvent.click(yesRadioButton);
    expect(spyFn).toBeCalledTimes(1);
  });
});
