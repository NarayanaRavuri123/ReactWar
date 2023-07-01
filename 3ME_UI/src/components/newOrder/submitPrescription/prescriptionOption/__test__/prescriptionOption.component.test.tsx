import { MemoryRouter } from "react-router-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { PrescriptionOption } from "../prescriptionOption.component";
import RadioButtonIcon from "../../../../../assets/radioButton.svg";
import SelectedRadioButtonIcon from "../../../../../assets/selectedRadioButton.svg";

describe("Prescription Option component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Prescription option title", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PrescriptionOption
          id={"id"}
          title={"Option Title"}
          prescriptionClassName=""
          description={"description"}
          isOptionSelected={false}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("Option Title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Option Title");
  });

  it("Prescription option description", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PrescriptionOption
          id={"id"}
          title={"title"}
          prescriptionClassName=""
          description={"Option Description"}
          isOptionSelected={false}
        />
      </MemoryRouter>
    );
    const description = screen.getByTestId("Option Description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("Option Description");
  });

  it("Prescription option radio button selected", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PrescriptionOption
          id={"id"}
          title={"title"}
          prescriptionClassName=""
          description={"description"}
          isOptionSelected={true}
        />
      </MemoryRouter>
    );
    const radioButton = screen.getByTestId("test-id");
    const radioButtonImage = screen.getByTestId(
      "test-image-id"
    ) as HTMLImageElement;
    expect(radioButton).toBeInTheDocument();
    expect(radioButtonImage).toHaveAttribute("src", SelectedRadioButtonIcon);
    expect(radioButtonImage).toHaveAttribute("alt", SelectedRadioButtonIcon);
  });

  it("Prescription option radio button deselected", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PrescriptionOption
          id={"id"}
          title={"title"}
          prescriptionClassName=""
          description={"description"}
          isOptionSelected={false}
        />
      </MemoryRouter>
    );
    const radioButton = screen.getByTestId("test-id");
    const radioButtonImage = screen.getByTestId(
      "test-image-id"
    ) as HTMLImageElement;
    expect(radioButton).toBeInTheDocument();
    expect(radioButtonImage).toHaveAttribute("src", RadioButtonIcon);
    expect(radioButtonImage).toHaveAttribute("alt", RadioButtonIcon);
  });

  it("Prescription option radio button clcik action", () => {
    const spyFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PrescriptionOption
          id={"id"}
          title={"title"}
          prescriptionClassName=""
          description={"description"}
          isOptionSelected={false}
          buttonOnClick={spyFn}
        />
      </MemoryRouter>
    );
    const radioButton = screen.getByTestId("test-id") as HTMLButtonElement;
    const radioButtonImage = screen.getByTestId(
      "test-image-id"
    ) as HTMLImageElement;
    expect(radioButton).toBeInTheDocument();
    expect(radioButtonImage).toHaveAttribute("src", RadioButtonIcon);
    expect(radioButtonImage).toHaveAttribute("alt", RadioButtonIcon);
    fireEvent.click(radioButton);
    expect(spyFn).toBeCalled();
    expect(spyFn).toHaveBeenCalledTimes(1);
  });
});
