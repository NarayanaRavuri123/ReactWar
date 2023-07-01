import { cleanup, render, screen } from "@testing-library/react";
import { useContext } from "react";
import { MemoryRouter } from "react-router-dom";
import { any } from "underscore";
import { AuthContextType, AuthContext } from "../../../context/AuthContext";
import { getUserFavouriteFacilities } from "../../../util/userService";
import FavoriteFacility from "../favoriteFacilityDisplay.component";

describe("Validate Forgot password UI ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Your Favorite title present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <FavoriteFacility />
      </MemoryRouter>
    );
    const header = screen.getByTestId("favorite-facility");
    expect(header).toBeInTheDocument();
  });
  it(" Select table contect present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <FavoriteFacility />
      </MemoryRouter>
    );
    const content = screen.getByTestId("Facility-list");
    expect(content).toBeInTheDocument();
  });
  it("Favorite Facilities present or not", async () => {
    const favFacilities = { title: "Test" };
    const mRes = { json: jest.fn().mockResolvedValueOnce(favFacilities) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    const data = AuthContext
    global.fetch = mockedFetch;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <FavoriteFacility />
      </MemoryRouter>
    );
    await getUserFavouriteFacilities(data).then((response) =>
      expect(response).toBeresponse)
});
  });


