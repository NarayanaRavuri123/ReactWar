import { cleanup, render, screen } from "@testing-library/react";
import { NewOrderOptions } from "../newOrderOptions.component";

describe("newOrderOptions", () => {
    afterAll(() => {
        cleanup();
    });
    it("Home Order Button link exists?", () => {
        render(<NewOrderOptions />);
        const dressingLink = screen.getByTestId("homeorder");
        expect(dressingLink).toBeInTheDocument();
        expect(dressingLink).toHaveTextContent("Home Order");
    });

    it("Supply Order Button link exists?", () => {
        render(<NewOrderOptions />);
        const dressingLink = screen.getByTestId("supplyorder");
        expect(dressingLink).toBeInTheDocument();
        expect(dressingLink).toHaveTextContent("Order Supplies");
    });
});