import { MemoryRouter } from "react-router-dom";
import { cleanup, render, screen } from "@testing-library/react";
import ChangePrescriptionRxUpload from "../changePrescriptionRxUpload.component";
import { IDropZoneDocumentSelect } from "../../../../../../../core/customDropZone/dropZoneDocumentSelect.interface";

describe("Change Prescription Upload Component->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Verify change prescription upload component", () => {
    const data: IDropZoneDocumentSelect[] = [];
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangePrescriptionRxUpload docData={data} setDocData={() => {}} />
      </MemoryRouter>
    );
    const component = screen.getByTestId("change-pres");
    expect(component).toBeInTheDocument();
  });

  it("Verify change prescription upload component for upload div", () => {
    const data: IDropZoneDocumentSelect[] = [];
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangePrescriptionRxUpload docData={data} setDocData={() => {}} />
      </MemoryRouter>
    );
    const uploadDiv = screen.getByTestId("change-pres-uploaddiv");
    expect(uploadDiv).toBeInTheDocument();
  });
});
