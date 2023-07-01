import React from "react";
import { INewOrder } from "../../newOrder.interface";
import { Osteomyelitis } from "../osteomyelitis.component";
import { NewOrderValidator } from "../../newOrder.validator";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { cleanup, render, screen } from "@testing-library/react";
import { newOrderWoundInfoTestData } from "../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
jest.mock("../../../../core/popup/popup.component");

describe("Osteomyelitis component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Insurance Information validate title", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <Osteomyelitis woundInfoData={data} setWoundInfoData={mockSetState} />
    );
    const title = screen.getByTestId("osteomyelitis-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Osteomyelitis");
  });

  it("Insurance Information validate Is osteomyelitis present in the wound?", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <Osteomyelitis woundInfoData={data} setWoundInfoData={mockSetState} />
    );
    const title = screen.getByTestId("osteomyelitis-isOsteomyelitisPresent");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Is osteomyelitis present in the wound?");
  });

  it("Insurance Information validate Is osteomyelitis present in the wound? yes button", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <Osteomyelitis woundInfoData={data} setWoundInfoData={mockSetState} />
    );
    const yesButton = screen.getByTestId(
      "osteomyelitis-isOsteomyelitisPresent-Yes"
    );
    expect(yesButton).toBeInTheDocument();
    expect(yesButton).not.toBeChecked();
  });

  it("Insurance Information validate Is osteomyelitis present in the wound? no button", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <Osteomyelitis woundInfoData={data} setWoundInfoData={mockSetState} />
    );
    const noButton = screen.getByTestId(
      "osteomyelitis-isOsteomyelitisPresent-No"
    );
    expect(noButton).toBeInTheDocument();
    expect(noButton).not.toBeChecked();
  });

  it("Insurance Information validate Indicate Treatment Regimen", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <Osteomyelitis woundInfoData={data} setWoundInfoData={mockSetState} />
    );
    const title = screen.getByTestId("osteomyelitis-treatment-regimen");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Indicate Treatment Regimen*");
  });

  it("Insurance Information validate is treatement for resolve underlying bone infection", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <Osteomyelitis woundInfoData={data} setWoundInfoData={mockSetState} />
    );
    const title = screen.getByTestId(
      "is-treatement-for-resolve-underlying-bone-infection"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Is the above treatment administered to the patient with the intention to completely resolve the underlying bone infection?*"
    );
  });

  it("Insurance Information validate is Treatemen For Resolve Bone Infection yes button", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <Osteomyelitis woundInfoData={data} setWoundInfoData={mockSetState} />
    );
    const yesButton = screen.getByTestId(
      "osteomyelitis-isTreatemenForResolveBoneInfection-Yes"
    );
    expect(yesButton).toBeInTheDocument();
    expect(yesButton).not.toBeChecked();
  });

  it("Insurance Information validate is Treatemen For Resolve Bone Infection no button", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <Osteomyelitis woundInfoData={data} setWoundInfoData={mockSetState} />
    );
    const noButton = screen.getByTestId(
      "osteomyelitis-isTreatemenForResolveBoneInfection-No"
    );
    expect(noButton).toBeInTheDocument();
    expect(noButton).not.toBeChecked();
  });
});
