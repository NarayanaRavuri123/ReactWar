
import { MemoryRouter } from "react-router-dom";
import { cleanup, render, screen, } from "@testing-library/react";
import ContactInfoManageProfile from "../contactInfoManageProfile.component";
import { profileTestData } from "../../__test__/manageProfile.test.data";

describe("Manage Profile contact information ->", () => {
    afterAll(() => {
        cleanup();
    });
    it("Validate Contact information section", async () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <ContactInfoManageProfile data={profileTestData} setData={() => { }} />
            </MemoryRouter>
        );
        const contactInfoTitle = screen.getByTestId("contact-information-mp");
        expect(contactInfoTitle).toBeInTheDocument();
    });
});