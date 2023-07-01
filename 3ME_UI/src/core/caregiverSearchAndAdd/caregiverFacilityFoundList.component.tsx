import { makeCapitalEachWordInString } from "../../util/utilityFunctions";
import { ExpressButton } from "../expressButton/expressButton.component";
import { IFacilityFoundList } from "./caregiverFacilitySearchAndAdd.model";

export const CaregiverFacilityFoundList = ({
  facilities,
  handleSelect,
  handleBackToSearch,
}: IFacilityFoundList) => {
  function renderFacilities() {
    return facilities.map((item, index) => {
      return (
        <div
          key={index}
          className={index % 2 === 0 ? "fl-even-card" : "fl-odd-card"}
        >
          <div className="fl-select" onClick={() => handleSelect(item)}>
            Select
          </div>
          <div className="fl-facility-info">
            <div className="fl-facility-name" data-testid="fl-facility-name">
              {makeCapitalEachWordInString(item.customerName)}
            </div>
            <div className="fl-facility-details-container">
              <div className="fl-facility-details-block">
                <div className="fl-facility-details" data-testid="address1">
                  {makeCapitalEachWordInString(item.address1)}{" "}
                  {makeCapitalEachWordInString(item.address2)}
                </div>
                <div className="fl-facility-details" data-testid="address3">
                  {makeCapitalEachWordInString(item.city)} {item.state},{" "}
                  {item.postalCode}
                </div>
              </div>
              <div className="fl-type-container">
                <div className="fl-phone-container">
                  <div className="fl-type-header">Phone</div>
                  <div className="fl-type-name" data-testid="facility-phone">
                    {item.phoneNo}
                  </div>
                </div>
                <div className="fl-phone-container">
                  <div className="fl-type-header">Type</div>
                  <div className="fl-type-name" data-testid="facility-type">
                    {makeCapitalEachWordInString(
                      item.marketingSegmentDescription
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="fl-list-container">
      <div className="fl-list-header" data-testid="fl-list-header">
        Facilities Search Results
      </div>
      {renderFacilities()}
      <ExpressButton
        variant="outlined"
        parentClass="fl-back-to-search-btn"
        clickHandler={handleBackToSearch}
      >
        <div className="fl-back-to-search-label">Back to Search</div>
      </ExpressButton>
    </div>
  );
};
