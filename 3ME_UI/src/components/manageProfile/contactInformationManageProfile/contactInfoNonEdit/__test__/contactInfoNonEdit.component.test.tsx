import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { profileTestData } from "../../../__test__/manageProfile.test.data";
import ContactInfoNonEdit from "../contactInfoNonEdit.component";

describe("Manage Profile contact information Non Edit->", () => {
    afterAll(() => {
        cleanup();
    });
    it("Validate Contact information Non Edit section", async () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <ContactInfoNonEdit data={profileTestData} />
            </MemoryRouter>
        );
        const contactInfoTitle = screen.getByTestId("phoneTitle-mp-test");
        expect(contactInfoTitle).toBeInTheDocument();
    });

    it("Click on Edit Link", async () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <ContactInfoNonEdit data={profileTestData} />
            </MemoryRouter>
        );
        const editContactInfoLink = screen.getByTestId("editPhone-mp-test");
        expect(editContactInfoLink).toBeInTheDocument();
        userEvent.click(editContactInfoLink);
    });
});