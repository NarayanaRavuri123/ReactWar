import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { newOrderWoundInfoTestData } from "../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import WoundTunneling from "../woundTunneling.component";
import TunnelingDetails from "../woundTunnelingDetails/tunnelingDetails.component";

describe("Wound Tunneling component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Wound Tunneling validate title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundTunneling woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("tunneling-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Tunneling");
  });

  it("Wound Tunneling desp validate title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundTunneling woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundTunneling-desp");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Is tunneling present in the wound?");
  });

  it("Wound Tunneling present? no button", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundTunneling woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const noButton = screen.getByTestId("woundTunneling-No");
    expect(noButton).toBeInTheDocument();
    expect(noButton).not.toBeChecked();
  });

  it("Wound Tunneling present? yes button", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundTunneling woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const noButton = screen.getByTestId("woundTunneling-Yes");
    expect(noButton).toBeInTheDocument();
    expect(noButton).not.toBeChecked();
  });

  it("Wound Tunneling details o’clock present?", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TunnelingDetails woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("oclock");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("o’clock");
  });
});
