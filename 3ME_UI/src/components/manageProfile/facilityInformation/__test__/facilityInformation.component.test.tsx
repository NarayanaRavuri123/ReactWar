import { cleanup, fireEvent, render } from "@testing-library/react";
import { ProfileFormContextProvider } from "../../../../context/ProfileFormContext";
import { FacilityInformation } from "../facilityInformation.component";
import { facilityList } from "../../../../mockData/facilityList";

describe("Facility Information component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Is Faclity Information Rendered", () => {
    render(<FacilityInformation />);
  });
  test("Check If the Facility Card rendered", () => {
    render(
      <ProfileFormContextProvider>
        <FacilityInformation facilityList={facilityList} />
      </ProfileFormContextProvider>
    );
    const faclityAddress = document.querySelector(".facilitytitle");
    expect(faclityAddress?.textContent).toBe("Address");
  });
  test("Check the count of facility card at initial stage", () => {
    render(
      <ProfileFormContextProvider>
        <FacilityInformation facilityList={facilityList} />
      </ProfileFormContextProvider>
    );
    expect(document.querySelectorAll(".facilitywrapper").length).toBe(2);
  });
  test("Open the Confirm Dialog box", async () => {
    render(
      <ProfileFormContextProvider>
        <FacilityInformation showtrash={true} facilityList={facilityList} />
      </ProfileFormContextProvider>
    );
    fireEvent.click(document.querySelector(".trash")!);
  });
  test("Check the count of facility card after Delete Faclity", async () => {
    render(
      <ProfileFormContextProvider>
        <FacilityInformation showtrash={true} facilityList={facilityList} />
      </ProfileFormContextProvider>
    );
    fireEvent.click(document.querySelector(".trash")!);
    fireEvent.click(document.querySelector(".confirmRemove")!);
    setTimeout(() => {
      expect(document.querySelectorAll(".facilitywrapper").length).toBe(1);
    }, 600);
  });
});
