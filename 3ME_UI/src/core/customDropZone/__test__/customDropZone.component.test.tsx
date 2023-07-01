import { MemoryRouter } from "react-router-dom";
import CustomDropZone from "../customDropZone.component";
import { getDeepClone } from "../../../util/ObjectFunctions";
import { render, screen, cleanup } from "@testing-library/react";
import { newOrderTestData } from "../../../components/newOrder/__test__/newOrder.test.data";

describe("custom DropZone component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate drag and drop container", () => {
    const data = getDeepClone(newOrderTestData.uploadDocument);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CustomDropZone
          buttonDropText="upload"
          data={data}
          dragDropText="upload"
          setData={() => {}}
          singleFile={true}
          listingType="newOrder"
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("drag-drop-id");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("upload");
  });

  it("Validate drag and drop button", () => {
    const data = getDeepClone(newOrderTestData.uploadDocument);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <CustomDropZone
          buttonDropText="upload"
          data={data}
          dragDropText="upload"
          setData={() => {}}
          singleFile={true}
          listingType="newOrder"
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("drag-drop-button-id");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("upload");
  });
});
