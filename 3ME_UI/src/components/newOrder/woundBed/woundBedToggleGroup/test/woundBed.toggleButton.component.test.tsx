import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { newOrderWoundInfoTestData } from "../../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import {
  Epthilization,
  Eschar,
  Granulation,
  Slough,
} from "../../woundBed.Data";
import { WoundBedToggleButton } from "../woundBed.toggleButton";

describe("WoundBedToggleButton component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("WoundBedToggleButton granulation Present", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundBedToggleButton
          groupValue={data.granulationValue.value}
          groupOnChange={() => ({})}
          buttonValue={Granulation}
          disableUnselected={false}
          label="Beefy, bright red granulation tissue"
          imgLink="https://multimedia.3m.com/mws/media/2142480H/licensed-rf-stock-asset-from-shutterstock-id-748148137.jpg"
        />
      </MemoryRouter>
    );
    const graTest = screen.getByTestId("GRA50test");
    expect(graTest).toBeInTheDocument();
  });
  it("WoundBedToggleButton Epthilization Present", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundBedToggleButton
          groupValue={data.epthilizationValue.value}
          groupOnChange={() => ({})}
          buttonValue={Epthilization}
          disableUnselected={false}
          label="Beefy, bright red granulation tissue"
          imgLink="https://multimedia.3m.com/mws/media/2142480H/licensed-rf-stock-asset-from-shutterstock-id-748148137.jpg"
        />
      </MemoryRouter>
    );
    const ephTest = screen.getByTestId("EPH25test");
    expect(ephTest).toBeInTheDocument();
  });
  it("WoundBedToggleButton slough Present", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundBedToggleButton
          groupValue={data.sloughValue.value}
          groupOnChange={() => ({})}
          buttonValue={Slough}
          disableUnselected={false}
          label="Beefy, bright red granulation tissue"
          imgLink="https://multimedia.3m.com/mws/media/2142480H/licensed-rf-stock-asset-from-shutterstock-id-748148137.jpg"
        />
      </MemoryRouter>
    );
    const sloTest = screen.getByTestId("SLO75test");
    expect(sloTest).toBeInTheDocument();
  });
  it("WoundBedToggleButton eschar Present", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundBedToggleButton
          groupValue={data.escharValue.value}
          groupOnChange={() => ({})}
          buttonValue={Eschar}
          disableUnselected={false}
          label="Beefy, bright red granulation tissue"
          imgLink="https://multimedia.3m.com/mws/media/2142480H/licensed-rf-stock-asset-from-shutterstock-id-748148137.jpg"
        />
      </MemoryRouter>
    );
    const escharTest = screen.getByTestId("ESC100test");
    expect(escharTest).toBeInTheDocument();
  });
});
