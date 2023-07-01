import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import WoundTunneling from "../../../../../../newOrder/woundTunneling/woundTunneling.component";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";

describe("Wound Tunneling component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Wound Tunneling validate title", () => {
    const data = getDeepClone(defaultAddWoundAssessment);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundTunneling woundInfoData={data} setWoundInfoData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("tunneling-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Tunneling");
  });
});
