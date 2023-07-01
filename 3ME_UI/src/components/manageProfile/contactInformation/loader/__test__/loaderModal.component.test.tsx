import { LoaderModal } from "../loaderModal.component";
import { cleanup, render, screen } from "@testing-library/react";

describe("Loader Modal ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Loader Modal validate rendered or not", () => {
    render(<LoaderModal />);
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("Loader Modal validate loading", () => {
    render(<LoaderModal />);
    const loading = screen.getByTestId("loading-text-large");
    expect(loading).toBeInTheDocument();
    expect(loading).toHaveTextContent("Loading");
  });

  it("Loader Modal validate processing your request", () => {
    render(<LoaderModal />);
    const loading = screen.getByTestId("loading-text-small");
    expect(loading).toBeInTheDocument();
    expect(loading).toHaveTextContent("Processing your request...");
  });
});
